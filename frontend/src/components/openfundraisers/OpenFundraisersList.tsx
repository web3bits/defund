import { useEffect, useState } from "react";
import { FundRaiserStatus } from "../../enums/FundRaiserStatus";
import { FundraiserType } from "../../enums/FundRaiserType";
import { OpenFundRaiser } from "./OpenFundRaiserInterface";
import { OpenFundRaiserItem } from "./OpenFundRaiserItem";
import { CircularProgress, Container } from "@mui/material";

interface OpenFundRaiserListInterface {
  list: OpenFundRaiser[];
  loading: boolean;
}
const useOpenFundRaisersList = (): OpenFundRaiserListInterface => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO simulate loading fundraisers list
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return {
    list: [
      {
        _id: "1",
        _owner: "a",
        _type: FundraiserType.ONE_TIME_DONATION,
        _category: "Medicines",
        _endDate: new Date().getTime() + 10000,
        _name: "Louise Philips",
        _initialDescription: "I need money to buy tablets",
        _status: FundRaiserStatus.ACTIVE,
      },
      {
        _id: "2",
        _owner: "a",
        _type: FundraiserType.LOAN,
        _category: "Books",
        _endDate: new Date().getTime() + 5000,
        _name: "Peter Stoichkov",
        _initialDescription: "Need to buy books for my ten years old son.",
        _status: FundRaiserStatus.FULLY_FUNDED,
      },
    ],
    loading,
  };
};

export const OpenFundRaisersList = (): JSX.Element => {

  const { list, loading } = useOpenFundRaisersList();

  if (!Array.isArray(list) || list.length === 0) {
    return <h1>There are no open fundraisers</h1>;
  }

  return (
    // <Container disableGutters maxWidth="lg" component="main" sx={{ py: 0, margin: "0 auto" }}>
    //   {!loading ?
    //     <CircularProgress color="primary" />
    //     :
        <>
          {
            list.map((fundRaiserItem: OpenFundRaiser) => (
              <OpenFundRaiserItem key={fundRaiserItem._id} item={fundRaiserItem} />
            ))
            }
        </>
    //   }
    // </Container>
  );
};
