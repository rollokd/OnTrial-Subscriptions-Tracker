import SubscriptionItem from "./SubscriptionItem";
import mockSubscriptions from "../mockSubscriptions"

const SubscriptionList = () => {
  return (
    <div>
      {mockSubscriptions.map(subscription => (
        <SubscriptionItem key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
};

export default SubscriptionList;