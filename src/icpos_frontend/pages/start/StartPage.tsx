import { Link, Navigate } from "@tanstack/router";

import { ReactComponent as W2E } from "../../assets/w2e.svg";
import LoginButton from "./components/LoginButton";
import MainSection from "../../components/MainSection";
import Page from "../../components/Page";
import { ReactNode } from "react";
import { useIcPos } from "../../canisters/ic-pos/hooks/useIcPos";

export default function StartPage(): ReactNode {
  const { merchantState } = useIcPos();

  // If the merchant state is initialized it means that the backend icpos actor is available
  if (merchantState.initialized) {
    // If the merchant is initialized, navigate to the merchant page
    if (merchantState.merchant) {
      return <Navigate to="/merchant" />;
    }
    // Otherwise, navigate to the config page to create a merchant
    return <Navigate to="/initial-config" />;
  }

  return (
    <Page>
      <MainSection>
        <div className="flex flex-col items-center justify-between p-10 space-y-5 grow">
          <div className="flex items-center justify-center w-full p-10">
            <W2E />
          </div>
          <div className="text-4xl font-bold">Waste2Earn-PAY </div>
          <div className="text-center">
            Setup a simple profile that accept your waste exchange payments on the Internet
            Computer. Sign in with Internet Identity to get started or{" "}
            <Link to="/receive-select-principal">
              monitor any address without signing in
            </Link>
            .
          </div>
          <div className="grow" />
          <LoginButton />
        </div>
      </MainSection>
    </Page>
  );
}
