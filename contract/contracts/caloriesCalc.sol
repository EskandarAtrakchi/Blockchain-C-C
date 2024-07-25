// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CalorieCalculator {
    struct Calculation {
        address user;
        string gender;
        uint age;
        uint height;
        uint weight;
        uint activityLevel;
        uint calories;
    }

    Calculation[] public calculations;
    mapping(address => uint[]) public userCalculations;

    event CalculationRecorded(
        address indexed user,
        string gender,
        uint age,
        uint height,
        uint weight,
        uint activityLevel,
        uint calories
    );

    function recordCalculation(
        string memory gender,
        uint age,
        uint height,
        uint weight,
        uint activityLevel,
        uint calories
    ) public {
        calculations.push(Calculation(msg.sender, gender, age, height, weight, activityLevel, calories));
        uint calculationId = calculations.length - 1;
        userCalculations[msg.sender].push(calculationId);
        emit CalculationRecorded(msg.sender, gender, age, height, weight, activityLevel, calories);
    }

    function getCalculation(uint index) public view returns (Calculation memory) {
        require(index < calculations.length, "Calculation does not exist");
        return calculations[index];
    }

    function getUserCalculations(address user) public view returns (uint[] memory) {
        return userCalculations[user];
    }
}
