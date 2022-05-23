import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderButton = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const orderDisabled = orderDetails.totals.scoops === "$0.00";

  return (
    <Button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
      Order Sundae!
    </Button>
  );
};

export default OrderButton;
