import { differenceInDays, addMonths, isBefore } from 'date-fns';

export const calculateRenewalText = (billingDateInput) => {
  const today = new Date();
  let billingDate = new Date(billingDateInput);

   let monthsToAdd = 0;
  while (isBefore(billingDate, today)) {
    billingDate = addMonths(new Date(billingDateInput), ++monthsToAdd);
  }

  const daysLeft = differenceInDays(billingDate, today);

  if (daysLeft > 1) return `${daysLeft} days left`;
  if (daysLeft === 1) return 'Renewal in 1 day';
  if (daysLeft === 0) return 'Renewal today';
  
  return 'Renewal date passed';
};