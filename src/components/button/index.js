import React, { useState } from "react";

const Button = () => {
  const [btnColor, setBtnColor] = useState("red");
  const newButtonColor = btnColor === "red" ? "blue" : "red";

  return (
    <button
      style={{ backgroundColor: btnColor }}
      onClick={() => setBtnColor(newButtonColor)}
    >
      Change to {newButtonColor}
    </button>
  );
};

export default Button;
