import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";

// optionType: scoops | toppings
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        // TODO - do it later
        console.log(err);
      });
  }, [optionType]);

  // TODO - replace `null` with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} {...item} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
