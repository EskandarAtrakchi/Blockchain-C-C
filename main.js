function calculateCalories() {
    // Get user input
    var gender = document.getElementById("gender").value;
    var age = parseInt(document.getElementById("age").value);
    var height = parseInt(document.getElementById("height").value);
    var weight = parseInt(document.getElementById("weight").value);
    var activityLevel = parseFloat(document.getElementById("activity-level").value);
  
    // Calculate basal metabolic rate (BMR)
    var bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  
    // Calculate total daily energy expenditure (TDEE)
    var tdee = bmr * activityLevel;
  
    // Display result
    var result = document.getElementById("result");
    result.innerHTML = "Your daily calorie needs are about: " + tdee.toFixed(2) + " calories.";
  }