import * as React from "react";
import { GlobalContextProvider } from "./context/GlobalContext";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/ui/Layout";
import { HomePage } from "./components/pages/HomePage";
import { Error404 } from "./components/pages/Error404";

export default function App() {
  return (
    // @ts-ignore
    <GlobalContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/fundraiser" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </GlobalContextProvider>
  );
}
