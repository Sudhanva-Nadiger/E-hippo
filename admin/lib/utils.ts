import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GraphData } from "./actions";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export const generateYAxis = (revenue: GraphData[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.total));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};