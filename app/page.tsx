import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl p-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Calorie Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 mt-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender:</Label>
            <Select>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Male" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age:</Label>
            <Input id="age" placeholder="Enter your age" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm):</Label>
            <Input
              id="height"
              placeholder="Enter your height in cm"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg):</Label>
            <Input
              id="weight"
              placeholder="Enter your weight in kg"
              type="number"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="activity">Activity Level:</Label>
            <Select>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Sedentary (little or no exercise)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">
                  Sedentary (little or no exercise)
                </SelectItem>
                <SelectItem value="light">
                  Lightly active (light exercise/sports 1-3 days/week)
                </SelectItem>
                <SelectItem value="moderate">
                  Moderately active (moderate exercise/sports 3-5 days/week)
                </SelectItem>
                <SelectItem value="active">
                  Very active (hard exercise/sports 6-7 days a week)
                </SelectItem>
                <SelectItem value="extra-active">
                  Super active (very hard exercise/sports & physical job)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-green-500 text-white">
            Calculate Calories
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
