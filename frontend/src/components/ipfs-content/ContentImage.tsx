import { useWeb3Storage } from "../../hooks/useWeb3Storage";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

interface FundraiserImage {
  src?: string;
}

interface ContentImageProps {
  cid?: string;
}

export const ContentImage = ({ cid }: ContentImageProps) => {
  const { getJson } = useWeb3Storage();
  const [image, setImage] = useState<FundraiserImage>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!cid) {
      return;
    }

    setLoading(true);
    getJson(cid)
      .then((result: any) => {
        try {
          setImage(JSON.parse(result));
        } catch (e: any) {
          console.log("Could not parse JSON", e);
          setImage(undefined);
        }
      })
      .finally(() => setLoading(false));
  }, [cid]);

  if (!cid) {
    return null;
  }

  if (isLoading || !image) {
    return <Skeleton variant="rectangular" />;
  }

  // TODO should be base64
  return <img src={image.src} alt="" />;
};
