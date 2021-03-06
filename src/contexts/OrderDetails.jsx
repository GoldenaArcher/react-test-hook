import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRICE_PER_ITEM } from "../constants";
import { formatCurrency } from "../utilities";

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

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    total: zeroCurrency,
  });

  useEffect(() => {
    const scoopSubtotal = calculateSubtotals("scoops", optionCounts);
    const toppingSubtotal = calculateSubtotals("toppings", optionCounts);
    const total = scoopSubtotal + toppingSubtotal;
    setTotals({
      scoops: formatCurrency(scoopSubtotal),
      toppings: formatCurrency(toppingSubtotal),
      total: formatCurrency(total),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, 1 * newItemCount);
      setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
