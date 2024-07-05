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
import { useState } from "react";

// Mark the component for client-side execution
export default function Calculate() {
                 const [gender, setGender] = useState("male");
                 const [age, setAge] = useState("");
                 const [height, setHeight] = useState("");
                 const [weight, setWeight] = useState("");
                 const [activityLevel, setActivityLevel] = useState("1.2");
                 const [result, setResult] = useState<string | null>(null);

                 const activityLevelMap: { [key: string]: number } = {
                   sedentary: 1.2,
                   light: 1.375,
                   moderate: 1.55,
                   active: 1.725,
                   extraActive: 1.9,
                 };

                 const calculateCalories = () => {
                   const ageValue = parseInt(age, 10);
                   const heightValue = parseInt(height, 10);
                   const weightValue = parseInt(weight, 10);
                   const activityValue = activityLevelMap[activityLevel];

                   let bmr;
                   if (gender === "male") {
                     bmr =
                       88.362 +
                       13.397 * weightValue +
                       4.799 * heightValue -
                       5.677 * ageValue;
                   } else {
                     bmr =
                       447.593 +
                       9.247 * weightValue +
                       3.098 * heightValue -
                       4.33 * ageValue;
                   }

                   const tdee = bmr * activityValue;

                   setResult(
                     `Your daily calorie needs are about: ${tdee.toFixed(
                       2
                     )} calories.`
                   );
                 };

                 return (
                   <div className="flex items-center justify-center min-h-screen bg-gray-100">
                     <Card className="w-full max-w-3xl p-8">
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
                             value={gender}
                             onValueChange={(e) => setGender(e.target.value)}
                           >
                             <SelectTrigger id="gender">
                               <SelectValue placeholder="Select Gender" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="male">Male</SelectItem>
                               <SelectItem value="female">Female</SelectItem>
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
                             onChange={(e) => setWeight(e.target.value)}
                           />
                         </div>
                         {/* Activity Level Select */}
                         <div className="space-y-2 col-span-2">
                           <Label htmlFor="activity">Activity Level:</Label>
                           <Select
                             value={activityLevel}
                             onValueChange={(e) =>
                               setActivityLevel(e.target.value)
                             }
                           >
                             <SelectTrigger id="activity">
                               <SelectValue placeholder="Select Activity Level" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="sedentary">
                                 Sedentary (little or no exercise)
                               </SelectItem>
                               <SelectItem value="light">
                                 Lightly active (light exercise/sports 1-3
                                 days/week)
                               </SelectItem>
                               <SelectItem value="moderate">
                                 Moderately active (moderate exercise/sports 3-5
                                 days/week)
                               </SelectItem>
                               <SelectItem value="active">
                                 Very active (hard exercise/sports 6-7 days a
                                 week)
                               </SelectItem>
                               <SelectItem value="extraActive">
                                 Super active (very hard exercise/sports &
                                 physical job)
                               </SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                       </CardContent>
                       <CardFooter className="flex justify-center">
                         <Button
                           className="bg-green-500 text-white"
                           onClick={calculateCalories}
                         >
                           Calculate Calories
                         </Button>
                       </CardFooter>
                       {result && (
                         <div className="text-center mt-4">{result}</div>
                       )}
                     </Card>
                   </div>
                 );
               }
