import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { abi } from "../components/caloriesCalc-ABI.ts";
import { config } from "../wagmi.ts";

export default function RetrieveRecords() {
  const { address } = useAccount();
  const [data, setData] = useState({
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    activityLevel: 0,
    calories: 0,
  });

  useEffect(() => {
    if (address) {
      async function fetchContractData() {
        try {
          const userCalculations = await readContract(config, {
            abi,
            address: "0x72805661557035298b11834EAB468bDFe7966f92",
            functionName: "getUserCalculations",
            args: [address?.toString()],
          });

          if (userCalculations.length > 0) {
            // let change = 1;
            // for (let i = 0; i <= userCalculations.length; i++) {
            //   change++;
            // }
            const latestIndex = userCalculations[userCalculations.length - 1];

            const result = await readContract(config, {
              abi,
              address: "0x72805661557035298b11834EAB468bDFe7966f92",
              functionName: "getCalculation",
              args: [latestIndex],
            });

            setData({
              gender: result.gender.toString(),
              age: parseInt(result.age.toString()),
              height: parseInt(result.height.toString()),
              weight: parseInt(result.weight.toString()),
              activityLevel: parseInt(result.activityLevel.toString()),
              calories: parseInt(result.calories.toString()),
            });
          } else {
            alert("out of bound exception");
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchContractData();
    }
  }, [address]);

  return (
    <div>
      <Dialog>
        <DialogTrigger
          className="bg-black text-white hover:text-black float-right"
          asChild
        >
          <Button>Previos Record</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>This is you previos record</DialogTitle>
            <DialogDescription>
              All of your records are saved on the blockchain, this card shows only the last record.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>:
                <br />
                {address?.toString()}
              </div>
              <br />
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>: {data.gender}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>: {data.age}
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>: {data.height}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>: {data.weight}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>: {data.activityLevel}
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calorie Information</Label>: {data.calories}
            </div>
          </div>
          {/* <Button
            // onClick={increment}
            className="bg-black text-white hover:text-black"
          >
            click Me
          </Button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
