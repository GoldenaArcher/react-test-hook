import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  // orderPhase needs to be 'inProgress', 'review' or 'completed
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;

  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
  }

  return (
    <OrderDetailsProvider>
      <Container> {<Component setOrderPhase={setOrderPhase} />} </Container>;
    </OrderDetailsProvider>
  );
}

export default App;
