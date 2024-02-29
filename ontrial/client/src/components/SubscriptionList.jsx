import SubscriptionItem from "./SubscriptionItem";
import mockSubscriptions from "../mockSubscriptions"

const SubscriptionList = ({onEdit}) => {
  return (
    <div>
      {mockSubscriptions.map(subscription => (
        <SubscriptionItem key={subscription.id} subscription={subscription} onEdit={() => onEdit(subscription)} />
      ))}
    </div>
  );
};

export default SubscriptionList;