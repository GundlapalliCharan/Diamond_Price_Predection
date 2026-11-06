export const CUT_OPTIONS = [
  { value: "Fair", label: "Fair", desc: "Maximizes carat weight at expense of brilliance" },
  { value: "Good", label: "Good", desc: "Reflects most light with high durability" },
  { value: "Very Good", label: "Very Good", desc: "Exceptional brilliance and sparkle" },
  { value: "Premium", label: "Premium", desc: "Optimized for maximum fire and sparkle" },
  { value: "Ideal", label: "Ideal", desc: "Flawless proportions reflecting nearly 100% of light" }
];

export const COLOR_OPTIONS = [
  { value: "D", label: "D - Absolutely Colorless", grade: "Best" },
  { value: "E", label: "E - Colorless", grade: "Top" },
  { value: "F", label: "F - Colorless", grade: "Top" },
  { value: "G", label: "G - Near Colorless", grade: "High" },
  { value: "H", label: "H - Near Colorless", grade: "High" },
  { value: "I", label: "I - Faint Tint", grade: "Standard" },
  { value: "J", label: "J - Faint Tint", grade: "Warm" }
];

export const CLARITY_OPTIONS = [
  { value: "IF", label: "IF (Internally Flawless)", desc: "No inclusions visible under 10x magnification" },
  { value: "VVS1", label: "VVS1 (Very, Very Slightly Included 1)", desc: "Extremely difficult to see inclusions" },
  { value: "VVS2", label: "VVS2 (Very, Very Slightly Included 2)", desc: "Minute inclusions under 10x magnification" },
  { value: "VS1", label: "VS1 (Very Slightly Included 1)", desc: "Minor inclusions not visible to naked eye" },
  { value: "VS2", label: "VS2 (Very Slightly Included 2)", desc: "Minor inclusions easily seen under 10x" },
  { value: "SI1", label: "SI1 (Slightly Included 1)", desc: "Noticeable under 10x, eye-clean in most cuts" },
  { value: "SI2", label: "SI2 (Slightly Included 2)", desc: "Noticeable under 10x, sometimes visible to eye" },
  { value: "I1", label: "I1 (Included 1)", desc: "Inclusions obvious under 10x, may affect brilliance" }
];

export const BENCHMARK_METRICS = {
  random_forest: {
    name: "Random Forest Regressor",
    r2: "0.970881",
    mae: "$310.16",
    rmse: "$678.36",
    strengths: "Lower Mean Absolute Error (MAE), robust to non-linear tree partitions."
  },
  ann: {
    name: "Artificial Neural Network (ANN)",
    r2: "0.973891",
    mae: "$340.31",
    rmse: "$642.34",
    strengths: "Higher R² score and lower RMSE, smooth gradient representation."
  }
};

export const PRESET_DIAMONDS = [
  {
    name: "Standard Engagement",
    badge: "Popular",
    data: {
      carat: 0.70,
      cut: "Ideal",
      color: "E",
      clarity: "VS1",
      depth: 61.5,
      table: 55.0,
      x: 5.70,
      y: 5.72,
      z: 3.51
    }
  },
  {
    name: "Luxury Solitaire",
    badge: "High End",
    data: {
      carat: 1.50,
      cut: "Ideal",
      color: "D",
      clarity: "VVS1",
      depth: 61.8,
      table: 57.0,
      x: 7.34,
      y: 7.38,
      z: 4.55
    }
  },
  {
    name: "Budget Round Cut",
    badge: "Value",
    data: {
      carat: 0.35,
      cut: "Very Good",
      color: "G",
      clarity: "SI1",
      depth: 62.4,
      table: 58.0,
      x: 4.52,
      y: 4.55,
      z: 2.83
    }
  }
];
