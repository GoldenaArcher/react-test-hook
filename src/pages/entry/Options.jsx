import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { PRICE_PER_ITEM } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

// optionType: scoops | toppings
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} {...item} />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{PRICE_PER_ITEM[optionType]} each</p>
      <Row>{optionItems}</Row>;
    </>
  );
};

export default Options;
