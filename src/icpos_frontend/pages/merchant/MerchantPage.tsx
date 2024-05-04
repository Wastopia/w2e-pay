import { Cog, LogOut, QrCodeIcon } from "lucide-react";
import { Link, Navigate } from "@tanstack/router";

import { Button } from "../../components/ui/button";
import FullpageLoading from "../../components/FullpageLoading";
import HeaderSection from "../../components/HeaderSection";
import HistoryButton from "../../components/HistoryButton";
import MainSection from "../../components/MainSection";
import Page from "../../components/Page";
import PrincipalPill from "../../components/PrincipalPill";
import SendButton from "./components/SendButton";
import TransactionOverlay from "../receive/components/TransactionOverlay";
import { Transfer } from "../../canisters/icrc/types/transfer.type";
import { formatW2E } from "../../utils/formatW2E";
import { useAuth } from "../../auth/hooks/useAuth";
import useW2ELedger from "../../canisters/w2e-ledger/hooks/useW2ELedger";
import { useIcPos } from "../../canisters/ic-pos/hooks/useIcPos";
import { useState } from "react";
import ChargeButton from "./components/ChargeButton";

export default function MerchantPage() {
  const { merchantState } = useIcPos();
  const { identity, hasLoggedIn, logout } = useAuth();
  const { balance, getBalance } = useW2ELedger();

  const [receivedTransfer, setReceivedTransfer] = useState<Transfer>();

  const handleReceivedTransfer = (transfer: Transfer) => {
    void getBalance();
    setReceivedTransfer(transfer);
  };

  // This page requires authentication
  if (!hasLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!merchantState || !merchantState.merchant || !identity)
    return <FullpageLoading />;

  return (
    <Page>
      <div className="relative flex flex-col grow">
        <HeaderSection>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <LogOut
                className="w-4 h-4"
                onClick={() => {
                  logout && logout();
                  window.location.href = "/";
                }}
              />
            </Button>
          </Link>
          {merchantState?.merchant?.name}
          <Link to="/config">
            <Button variant="ghost" size="icon">
              <Cog className="w-4 h-4" />
            </Button>
          </Link>
        </HeaderSection>
        <TransactionOverlay onTransfer={handleReceivedTransfer} />
        <MainSection>
          <div className="flex flex-col items-center justify-between pb-10 space-y-5 grow">
            <div className="grow" />
            <div>{formatW2E(balance)} W2E</div>
            <PrincipalPill principal={identity?.getPrincipal().toString()} />
            {receivedTransfer && (
              <div className="text-sm text-gray-400">
                Received {formatW2E(receivedTransfer.amount)} W2E
              </div>
            )}
            <div className="grow" />
            <ChargeButton />
            <SendButton />
            <Link to="/receive" className="flex items-center gap-2">
              Show store QR code <QrCodeIcon />
            </Link>
            <div className="flex flex-col items-center justify-end grow">
              <HistoryButton principal={identity?.getPrincipal().toString()} />
            </div>
          </div>
        </MainSection>
      </div>
    </Page>
  );
}
