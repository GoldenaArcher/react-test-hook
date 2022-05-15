import React from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";
import Options from "./Options";

const OrderEntry = () => {
  return (
    <Container>
      <OrderDetailsProvider>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
      </OrderDetailsProvider>
    </Container>
  );
};

export default OrderEntry;
