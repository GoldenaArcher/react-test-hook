import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRICE_PER_ITEM } from "../constants";

const OrderDetails = createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "userOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotals(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * PRICE_PER_ITEM[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    total: 0,
  });

  useEffect(() => {
    const scoopSubtotal = calculateSubtotals("scoops", optionCounts);
    const toppingSubtotal = calculateSubtotals("toppings", optionCounts);
    const total = scoopSubtotal + toppingSubtotal;
    setTotals({
      scoops: scoopSubtotal,
      toppings: toppingSubtotal,
      total,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, 1 * newItemCount);
      setOptionCounts(newOptionCounts);
    }

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts]);

  return <OrderDetails.Provider value={value} {...props} />;
}
