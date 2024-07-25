import "../index.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import ConnectButton from "../components/ConnectButton";
import Modal from "../components/Modal"; // Import the Modal component

//importing wagmi contract integration
import { useWriteContract, useWaitForTransactionReceipt, type BaseError } from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "../wagmi";

import * as React from "react";

//importing abi contract integration
import { abi } from "../components/caloriesCalc-ABI";

export default function Calculate() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState("180");
  const [weight, setWeight] = useState("75");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [result, setResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activityLevelMap: { [key: string]: number } = {
    sedentary: 120, // 1.2 * 100
    light: 137, // 1.375 * 100
    moderate: 155, // 1.55 * 100
    active: 172, // 1.725 * 100
    extraActive: 190, // 1.9 * 100
  };

  const calculateCalories = () => {
    const ageValue = parseInt(age, 10);
    const heightValue = parseInt(height, 10);
    const weightValue = parseInt(weight, 10);
    const activityValue = activityLevelMap[activityLevel];

    let bmr;
    if (gender === "male") {
      bmr =
        88.362 + 13.397 * weightValue + 4.799 * heightValue - 5.677 * ageValue;
    } else {
      bmr =
        447.593 + 9.247 * weightValue + 3.098 * heightValue - 4.33 * ageValue;
    }

    const tdee = bmr * activityValue;

    if (Number.isNaN(tdee)) {
      alert("Please fill out the form first and try again");
      return;
    }

    if (ageValue <= 15 || ageValue >= 91) {
      alert("Age must be between 16 and 90");
      return;
    } else if (heightValue <= 49 || heightValue >= 301) {
      alert("Height must be between 50 and 300");
      return;
    } else if (weightValue <= 24 || weightValue >= 151) {
      alert("Weight must be between 25 and 150");
      return;
    }

    setResult(`Your daily calorie needs are about: ${tdee.toFixed(0)/100} calories.`);
    setIsModalOpen(true);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const ownerAddress = formData.get("ownerAddress") as string;
    const age = formData.get("age") as string;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;
    const activityLevel = formData.get("activityLevel") as string;
    const results = result?.split(":")[1].trim();

    const activityLevelValue = activityLevelMap[activityLevel];

    writeContract({
      address: "0x72805661557035298b11834EAB468bDFe7966f92",
      abi,
      functionName: "recordCalculation",
      args: [
        ownerAddress,
        BigInt(age),
        BigInt(height),
        BigInt(weight),
        BigInt(activityLevelValue),
        BigInt(parseInt(results, 10)),
      ],
    });
  }

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  //getting connected wallet address 
  // Function to get the connected account address
  const getConnectedAccountAddress = () => {
    const account = getAccount(config);

    if (account.status === "connected") {
      console.log("Connected account address:", account.address);
      return account.address;
    } else {
      console.log("No account connected");
      return undefined;
    }
  };

  const ownerAddress = getConnectedAccountAddress();

  return (
    <form onSubmit={submit}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-3xl p-8">
          <ConnectButton />
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Calorie Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 mt-6 md:grid-cols-2">
            {/* Gender Select */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender:</Label>
              <Select
                name="gender"
                value={gender}
                onValueChange={(value: string) => setGender(value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-white hover:cursor-pointer">
                  <SelectItem value="male" className="hover:cursor-pointer">
                    Male
                  </SelectItem>
                  <SelectItem value="female" className="hover:cursor-pointer">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Age Input */}
            <div className="space-y-2">
              <Label htmlFor="age">Age:</Label>
              <Input
                id="age"
                value={age}
                placeholder="Enter your age"
                type="number"
                min="16"
                max="90"
                name="age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            {/* Height Input */}
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm):</Label>
              <Input
                id="height"
                value={height}
                placeholder="Enter your height in cm"
                type="number"
                min="50"
                max="300"
                name="height"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            {/* Weight Input */}
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg):</Label>
              <Input
                id="weight"
                value={weight}
                placeholder="Enter your weight in kg"
                type="number"
                min="25"
                max="150"
                name="weight"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            {/* Activity Level Select */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="activity">Activity Level:</Label>
              <Select
                name="activityLevel"
                value={activityLevel}
                onValueChange={(value: string) => setActivityLevel(value)}
              >
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select Activity Level" />
                </SelectTrigger>
                <SelectContent className="bg-white hover:cursor-pointer">
                  <SelectItem
                    value="sedentary"
                    className="hover:cursor-pointer"
                  >
                    Sedentary (little or no exercise)
                  </SelectItem>
                  <SelectItem value="light" className="hover:cursor-pointer">
                    Lightly active (light exercise/sports 1-3 days/week)
                  </SelectItem>
                  <SelectItem value="moderate" className="hover:cursor-pointer">
                    Moderately active (moderate exercise/sports 3-5 days/week)
                  </SelectItem>
                  <SelectItem value="active" className="hover:cursor-pointer">
                    Very active (hard exercise/sports 6-7 days a week)
                  </SelectItem>
                  <SelectItem
                    value="extraActive"
                    className="hover:cursor-pointer"
                  >
                    Super active (very hard exercise/sports & physical job)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-green-500 text-blue"
              onClick={calculateCalories}
            >
              {isPending ? "Confirming..." : "Calculate Calories"}
            </Button>
            
          </CardFooter>
        </Card>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>{result}</p>
          <Button className="mt-4" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <br />
          {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
              <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
        </Modal>
      </div>
    </form>
  );
}
