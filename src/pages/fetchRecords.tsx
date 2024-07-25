// import { useState } from "react";
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";

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

// import { config } from "../wagmi";

//importing abi contract integration
import { abi } from "../components/caloriesCalc-ABI";

const wagmiContractConfig = {
  address: "0x72805661557035298b11834EAB468bDFe7966f92",
  abi: abi,
};

export default function RetrieveRecords() {
  const { address } = useAccount();

  const {
    data: gender,
    age,
    height,
    weight,
    activityLevel,
    calories,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getUserCalculations",
    args: ["0x72805661557035298b11834EAB468bDFe7966f92"],
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black text-white hover:text-black float-right" asChild>
          <Button>Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Update Your Profile</DialogTitle>
            <DialogDescription>
              Fill out the form below to update your personal information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <br />
                {address?.toString()}
              </div>
              <br />
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                {gender?.toString()}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                {age?.toString()}
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                {height?.toString()}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                {weight?.toString()}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              {activityLevel?.toString()}
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calorie Information</Label>
              {calories?.toString()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
