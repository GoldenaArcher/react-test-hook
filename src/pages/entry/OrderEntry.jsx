import React from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";
import GrandTotal from "./GrandTotal";
import Options from "./Options";

const OrderEntry = () => {
  return (
    <Container>
      <OrderDetailsProvider>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
        <GrandTotal />
      </OrderDetailsProvider>
    </Container>
  );
};

export default OrderEntry;
