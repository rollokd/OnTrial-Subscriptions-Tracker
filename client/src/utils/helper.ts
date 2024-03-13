import { calculateRenewalText } from "./dateUtils";
import { Filtering, Sorting, Subscription } from "./definitions";

function sortSubscriptions (subscriptions: Subscription[], sortCriteria: Sorting) {
  return subscriptions.sort((a, b) => {
    switch (sortCriteria) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "billDate":
        return (
          calculateRenewalText(a.billingDate).daysToPayment -
          calculateRenewalText(b.billingDate).daysToPayment
        );
      case "mostExpensive":
        return b.cost - a.cost;
      case "cheapest":
        return a.cost - b.cost;
      default:
        return 0;
    }
  })
}

function filterSubscriptions (subscriptions: Subscription[], filterCriteria: Filtering) {
  if (filterCriteria !== "all") {
    subscriptions = subscriptions.filter((sub) =>
      filterCriteria === "active" ? sub.status : !sub.status
    );
  }
  return subscriptions
}

function getInputType(key: string) {
    switch (key) {
      case "name":
        return "text";
      case "cost":
        return "number";
      case "billingDate":
        return "date";
      case "status":
        return;
    }
  }

function toCapitalCase(input: string) {
  const result = input.replace(/([A-Z])/g, " $1");
  return input.charAt(0).toUpperCase() + result.slice(1);
}

function getMinMax():string[] {
  const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

const min = `${year}-${month < 10 ? "0" + month : month}-${day}`;
const max = `${year}-${month < 10 ? "0" + (month + 1) : month}-${day}`;
return [min,max];
}


export {
  sortSubscriptions,
  filterSubscriptions,
  getInputType,
  toCapitalCase,
  getMinMax,

}
