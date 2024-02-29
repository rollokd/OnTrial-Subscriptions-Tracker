import SubscriptionItem from "./SubscriptionItem";

const SubscriptionList = ({onEdit, subscriptions}) => {



  return (
    <div>
      {subscriptions.map(subscription => (
        <SubscriptionItem key={subscription._id} subscription={subscription} onEdit={() => onEdit(subscription)} />
      ))}
    </div>
  );
};

export default SubscriptionList;