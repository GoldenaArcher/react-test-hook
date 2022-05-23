import React from "react";
import { Container } from "react-bootstrap";
import GrandTotal from "./GrandTotal";
import Options from "./Options";
import OrderButton from "./Order";

const OrderEntry = ({ setOrderPhase }) => {
  return (
    <Container>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />
      <OrderButton setOrderPhase={setOrderPhase} />
    </Container>
  );
};

export default OrderEntry;
