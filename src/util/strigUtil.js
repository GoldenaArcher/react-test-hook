export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

export function replateStart(colorName) {
  return colorName.replace("MediumVioletRed", "MidnightBlue");
}
