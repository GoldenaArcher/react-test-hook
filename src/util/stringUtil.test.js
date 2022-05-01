import { replaceCamelWithSpaces, replateStart } from "./strigUtil";

describe("test string util", () => {
  test("replace camel with spaces", () => {
    expect(replaceCamelWithSpaces("Camel")).toBe("Camel");

    expect(replaceCamelWithSpaces("CamelCase")).toBe("Camel Case");

    expect(replaceCamelWithSpaces("DoDoGoGo")).toBe("Do Do Go Go");
  });

  test("replace MediumVioletRed to MidnightBlue", () => {
    expect(replateStart("MediumVioletRed")).toBe("MidnightBlue");

    expect(replateStart("MediumVioletRedDoDo")).toBe("MidnightBlueDoDo");

    expect(replateStart("DoDoMediumVioletRedDoDo")).toBe("DoDoMidnightBlueDoDo");
  });
});
