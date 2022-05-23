import React, { useState } from "react";
import {
  Button,
  Form,
  OverlayTrigger,
  Popover,
  PopoverBody,
} from "react-bootstrap";

const SummaryForm = ({ setOrderPhase }) => {
  const [orderConfirm, setOrderConfirm] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <PopoverBody>No ice cream will actually be delivered</PopoverBody>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions </span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          label={checkboxLabel}
          type="checkbox"
          checked={orderConfirm}
          onChange={() => setOrderConfirm(!orderConfirm)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!orderConfirm}
        onClick={() => setOrderPhase("completed")}
      >
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;
