import * as React from "react";
import { GlobalContextProvider } from "./context/GlobalContext";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/ui/Layout";
import { HomePage } from "./components/pages/HomePage";
import { Error404 } from "./components/pages/Error404";
import { CreateFundraiserPage } from "./components/pages/CreateFundraiserPage";
import { RequireAuth } from "./components/ui/RequireAuth";

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
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </GlobalContextProvider>
  );
}
