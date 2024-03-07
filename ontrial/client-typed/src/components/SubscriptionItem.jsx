
import { Box, Flex, Text, Button, Spacer } from '@chakra-ui/react';
import { calculateRenewalText } from '../utils/dateUtils';

const SubscriptionItem = ({ subscription, onEdit }) => {
const renewalText = calculateRenewalText(subscription.billingDate);


  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2} boxShadow="lg" maxW="sm" display="flex" justifyContent="" alignItems="center">
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
