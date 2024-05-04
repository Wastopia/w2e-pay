import { Button } from "../../../components/ui/button";
import { Link } from "@tanstack/router";

type ChargeButtonProps = {
  onClick: () => void;
  amount: number;
  disabled?: boolean;
};


export default function ChargeButton({ amount, onClick }: ChargeButtonProps) {
  return (
    <Link to={`/receive`} search={{ amount, onClick }} className="w-full px-5">
      <Button size={"lg"} className="w-full">
        Submit
      </Button>
    </Link>
  );
}
