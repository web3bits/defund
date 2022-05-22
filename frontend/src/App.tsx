import * as React from "react";
import { GlobalContextProvider } from "./context/GlobalContext";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/ui/Layout";
import { HomePage } from "./pages/HomePage";
import { Error404 } from "./pages/Error404";
import { CreateFundraiserPage } from "./pages/CreateFundraiserPage";
import { RequireAuth } from "./components/ui/RequireAuth";
import { OpenFundRaisersPage } from "./pages/OpendFundraisersPage";
import { AccountPage } from "./pages/AccountPage";

export default function App() {
  return (
    // @ts-ignore
    <GlobalContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/create" element={<CreateFundraiserPage />} />
          <Route path="/fundraisers" element={<OpenFundRaisersPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </GlobalContextProvider>
  );
}
