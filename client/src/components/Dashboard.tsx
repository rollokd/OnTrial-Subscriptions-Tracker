import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import SubscriptionList from "./SubscriptionList";
import AddEditSubscriptionForm from "./AddEditSubscriptionForm";
import apiService from "../services/apiService";
import Notification from "./Notification";
import { Filtering, Sorting, Subscription } from "../utils/definitions";
import { filterSubscriptions, sortSubscriptions } from "../utils/helper";

// const initialState = {
//   name: '',
//   cost: 0,
//   billingDate: '',
//   status: true
// }
const Dashboard = ({
  sortCriteria,
  filterCriteria,
}: {
  sortCriteria: Sorting;
  filterCriteria: Filtering;
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // TODO: type maybe need to be null on init
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Define applySortAndFilter inside useCallback to memoize it
  const applySortAndFilter = useCallback(
    (data: Subscription[]) => {
      // Filter
      data = filterSubscriptions(data, filterCriteria);

      // Sort
      data = sortSubscriptions(data, sortCriteria);

      setSubscriptions(data);
    },
    [filterCriteria, sortCriteria]
  );

  // Fetch and refresh subscriptions
  const refreshSubscriptions = useCallback(async () => {
    try {
      const data = await apiService.fetchSubscriptions();
      // console.log("fetch subs:", data);
      applySortAndFilter(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  }, [applySortAndFilter]);

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  const handleEdit = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentSubscription(null);
    refreshSubscriptions();
  };

  const averageExpenses = useMemo(
    () =>
      subscriptions
        .filter((sub) => sub.status)
        .reduce((acc, curr) => acc + curr.cost, 0)
        .toFixed(2),
    [subscriptions]
  );

  return (
    <Flex
      direction="column"
      bg="#ADC4CE"
      width="100%"
      height={"100%"}
      borderRadius="lg"
      p={4}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          Subscriptions
        </Text>
        <Notification />
        <Button colorScheme="teal" onClick={() => setIsFormOpen(true)}>
          Add Subscription
        </Button>
      </Flex>
      <Box flex="1" overflowY="auto">
        <SubscriptionList subscriptions={subscriptions} onEdit={handleEdit} />
      </Box>
      {isFormOpen && (
        <AddEditSubscriptionForm
          isOpen={isFormOpen}
          onClose={handleClose}
          subscription={currentSubscription}
          refreshSubscriptions={refreshSubscriptions}
        />
      )}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bg="gray.200"
        borderRadius="xl"
      >
        <Box borderRadius="lg">
          <Text fontSize="xl">Average Expenses</Text>
          <Text fontSize="sm" as="i" fontStyle="italic">
            per month
          </Text>
        </Box>
        <Text fontSize="xl">${averageExpenses}</Text>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
