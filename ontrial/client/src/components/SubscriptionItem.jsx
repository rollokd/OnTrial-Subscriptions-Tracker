
import { Box, Flex, Text, Button, Spacer } from '@chakra-ui/react';
import { differenceInDays } from 'date-fns';

const SubscriptionItem = ({ subscription, onEdit }) => {
  // Calculate days left until the billing date
  const today = new Date();
  const billingDate = new Date(subscription.billingDate);
  const daysLeft = differenceInDays(billingDate, today);
  const renewalText = daysLeft > 1 ? `${daysLeft} days left` : 'Renewal in 1 day';

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2} boxShadow="lg" display="flex" justifyContent="" alignItems="center">

      {/* Subscriptions Name */}
      <Text fontSize="xl" fontWeight="bold" flexShrink={0}>{subscription.name}</Text>

      <Spacer />

      {/* Cost and Billig date info */}
      <Flex direction="column" align="end">
        <Text fontSize="sm">${subscription.cost} / {subscription.billingCycle}</Text>
        <Text fontSize="sm" as="i">{renewalText}</Text>
      </Flex>

      {/* edit button */}
      <Button onClick={onEdit} colorScheme="yellow" ml={4}>Edit</Button>
    </Box>
  );
};

export default SubscriptionItem;
