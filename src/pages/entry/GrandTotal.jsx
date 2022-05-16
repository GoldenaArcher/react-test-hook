import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

const GrandTotal = () => {
  const [orderDetails, updateItemCount] = useOrderDetails();

  return <h2>Grand total: {orderDetails.totals.total}</h2>;
};

export default GrandTotal;
