import SubscriptionItem from "./SubscriptionItem";
import { Flex, Box } from '@chakra-ui/react';
const SubscriptionList = ({onEdit, subscriptions}) => {



  return (
    <div>
      <Flex
      direction="column"
      align="center" 
      w="full"
      py={5}
    >
      <Box w={{ base: "90%", md: "80%", lg: "70%" }} maxW="lg">
      {subscriptions.map(subscription => (
        <SubscriptionItem key={subscription._id} subscription={subscription} onEdit={() => onEdit(subscription)} />
      ))}
        </Box>
      </Flex>
    </div>
  );
};

export default SubscriptionList;