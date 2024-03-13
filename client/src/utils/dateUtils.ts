import { differenceInDays, addMonths, isBefore } from "date-fns";

export const calculateRenewalText = (billingDateInput: string) => {
  const today = new Date()
  today.setDate(25)
  let billingDate = new Date(billingDateInput)
  
  let monthsToAdd: number = 0;
  
  while (isBefore(billingDate, today)) {
    billingDate = addMonths(billingDate.toString(), ++monthsToAdd);
  }

  const daysLeft = differenceInDays(billingDate, today);

  if (daysLeft > 1) return {daysToPayment:daysLeft, message: `${daysLeft} days left`};
  if (daysLeft === 1) return {daysToPayment: daysLeft, message: "Renewal in 1 day"};
  if (daysLeft === 0) return {daysToPayment: daysLeft, message: "Renewal today"};

  return {daysToPayment: daysLeft, message: "Renewal date passed"};
};
