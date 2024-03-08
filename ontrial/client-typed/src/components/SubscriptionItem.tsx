import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { calculateRenewalText } from "../utils/dateUtils";
import { Subscription } from "../utils/definitions";

const SubscriptionItem = ({
  subscription,
  onEdit,
}: {
  subscription: Subscription;
  onEdit: () => void;
}) => {
  const renewalText = calculateRenewalText(subscription.billingDate);
  // subscription.name = 'bob'

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      boxShadow="lg"
      maxW="sm"
      display="flex"
      justifyContent=""
      alignItems="center"
    >
      {/* Subscriptions Name */}
      <Text fontSize="xl" fontWeight="bold" flexShrink={0}>
        {subscription.name}
      </Text>

      <Spacer />

      {/* Cost and Billing date info */}
      <Flex direction="column" align="end">
        {/* TODO: billingCycle entry added */}
        <Text fontSize="sm">
          ${subscription.cost} / month{/* {subscription.billingCycle} */}
        </Text>
        <Text fontSize="sm" as="i">
          {renewalText}
        </Text>
      </Flex>

      {/* edit button */}
      <Button onClick={onEdit} colorScheme="yellow" ml={4}>
        Edit
      </Button>
    </Box>
  );
};

export default SubscriptionItem;
