import { Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { memo } from "react";
import { getFundRaiserCategory, getFundRaiserStatus, getFundRaiserType } from "../../utils/FundRaiserUtils";

import { formatTimestamp } from "../../utils/DateUtils";
import { lightBlue, lightGreen } from "@mui/material/colors";
import { useContentMarkdown } from "../ipfs-content/ContentMarkdown";
import { BigNumber } from "ethers";

interface FundraiserItemInterface {
  category: number;
  defaultImage: string;
  description: string;
  endDate: BigNumber;
  fType: number;
  goalAmount: BigNumber;
  id: BigNumber;
  name: string;
  status: number;
}

export const OpenFundRaiserItem = memo(({ item }: { item: FundraiserItemInterface }) => {
  const { category, defaultImage, description, endDate, fType, goalAmount, name, status } = item;
  const type = `${getFundRaiserType(fType)} > ${getFundRaiserCategory(category)}`;
  const descriptionCid = description?.length > 0 ? description : undefined;
  const { content } = useContentMarkdown(descriptionCid);
  const randomId = Math.floor(Math.random() * (400 - 1 + 1) + 1);
  const randomPictureUrl = `https://picsum.photos/id/${randomId}/340/340`;

  console.log("goalAmount", goalAmount.toNumber(), goalAmount.toString(), goalAmount.toBigInt());

  const renderEndDate = () => {
    const iEndDate = endDate.toNumber();
    if (iEndDate === 0) {
      return null;
    }
    console.log("End Date", iEndDate);
    const formattedEndDate = formatTimestamp(iEndDate, "MM-DD-YYYY HH:mm:ss");
    return (
      <Typography variant="caption" component="p" sx={{ marginTop: ".5rem" }}>
        Until {formattedEndDate}
      </Typography>
    );
  };

  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ maxWidth: 345, height: 422, margin: ".5rem" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: lightBlue[500], color: "#FFFFFF" }} aria-label="recipe">
              {name.toUpperCase().charAt(0)}
            </Avatar>
          }
          title={name}
        />
        <CardMedia
          component="img"
          height={200}
          width={200}
          image={defaultImage?.length > 0 ? defaultImage : randomPictureUrl}
          alt={name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ height: content ? 50 : 10 }}>
            {content}
          </Typography>
          <Typography variant="caption" component="p">
            {type}
          </Typography>
          <Typography variant="caption" component="p">
            <Chip
              label={getFundRaiserStatus(status)}
              variant="outlined"
              sx={{ backgroundColor: lightGreen[500], color: "#FFFFFF", border: "none", marginRight: ".25rem" }}
            />
            Needs ${goalAmount.toNumber() / 100}
          </Typography>
          {renderEndDate()}
        </CardContent>
      </Card>
    </Grid>
  );
});
