import React, { useState } from "react";

const Quiz = () => {
  const [disabled, setDisabled] = useState(false);

  const toggleEnable = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <button
        onClick={toggleEnable}
        disabled={disabled}
        style={{ backgroundColor: disabled ? "gray" : "black" }}
      >
        Click
      </button>
      <label htmlFor="disabled-checkbox">Disable Checkbox</label>
      <input id="disabled-checkbox" type="checkbox" disabled={disabled} />
    </>
  );
};

export default Quiz;
