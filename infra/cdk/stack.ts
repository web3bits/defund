import * as cdk from "@aws-cdk/core";
import * as route53 from "@aws-cdk/aws-route53";
import * as s3 from "@aws-cdk/aws-s3";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as deploy from "@aws-cdk/aws-s3-deployment";

const WEB_APP_DOMAIN = process.env.WEB_APP_DOMAIN || "defund.link";

export class Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = route53.HostedZone.fromLookup(this, "DeFundZone", {
      domainName: WEB_APP_DOMAIN,
    });

    const bucket = new s3.Bucket(this, "DeFundBucket", {
      bucketName: WEB_APP_DOMAIN,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const certificate = new acm.DnsValidatedCertificate(
      this,
      "DeFundCertificate",
      {
        domainName: WEB_APP_DOMAIN,
        hostedZone: zone,
        region: "us-east-1", //standard for acm certs
      }
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "DeFundDistribution",
      {
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [WEB_APP_DOMAIN],
            // securityPolicy: cloudfront.SecurityPolicyProtocol.SSL_V3, // default
            // sslMethod: cloudfront.SSLMethod.SNI, // default
          },
        ),
        originConfigs: [
          {
            customOriginSource: {
              domainName: bucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
      }
    );

    new route53.ARecord(this, "DeFundRecord", {
      recordName: WEB_APP_DOMAIN,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
      zone,
    });

    new deploy.BucketDeployment(this, "DeFundDeployment", {
      sources: [deploy.Source.asset("../frontend/build")],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ["/*"],
    });
  }
}
