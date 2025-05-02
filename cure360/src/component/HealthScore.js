

export function calculateHealthScore(data) {
    let score = 100;
  
    const {
      heartRate,
      systolicBP,
      diastolicBP,
      oxygenLevel,
      temperature,
      age,
      weight,
      height,
      symptoms = "",
      conditions = "",
      smokes,
      drinks,
      anxiety,
      depression,
    } = data;
  
    const hr = parseInt(heartRate);
    const sys = parseInt(systolicBP);
    const dia = parseInt(diastolicBP);
    const oxy = parseFloat(oxygenLevel);
    const temp = parseFloat(temperature);
    const bmi = weight && height ? (weight / ((height / 100) ** 2)) : null;
  
    if (hr < 60 || hr > 100) score -= 10;
    if (sys < 90 || sys > 140) score -= 10;
    if (dia < 60 || dia > 90) score -= 10;
    if (oxy < 95) score -= 10;
    if (temp < 36 || temp > 37.5) score -= 10;
    if (bmi && (bmi < 18.5 || bmi > 24.9)) score -= 10;
    if (parseInt(age) > 60) score -= 10;
  
    if (symptoms?.split(",").length > 2) score -= 5;
    if (conditions?.split(",").length > 1) score -= 10;
  
    if (smokes === "yes") score -= 5;
    if (drinks === "yes") score -= 5;
    if (anxiety === "yes") score -= 5;
    if (depression === "yes") score -= 5;
  
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  