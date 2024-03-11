import { useEffect, useState, useCallback } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import SubscriptionList from "./SubscriptionList";
import AddEditSubscriptionForm from "./AddEditSubscriptionForm";
import apiService from "../services/apiService";
import Notification from "./Notification";
import { Subscription } from "../utils/definitions";

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
  sortCriteria: string;
  filterCriteria: string;
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // TODO: type maybe need to be null on init
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Define applySortAndFilter inside useCallback to memoize it
  const applySortAndFilter = useCallback(
    (data: Subscription[]) => {
      let result = data;

      // Filter
      if (filterCriteria !== "all") {
        result = result.filter((sub) =>
          filterCriteria === "active" ? sub.status : !sub.status
        );
      }

      // Sort
      result.sort((a, b) => {
        switch (sortCriteria) {
          case "alphabetical":
            return a.name.localeCompare(b.name);
          case "billDate":
            return (
              new Date(a.billingDate).valueOf() -
              new Date(b.billingDate).valueOf()
            );
          case "mostExpensive":
            return b.cost - a.cost;
          case "cheapest":
            return a.cost - b.cost;
          default:
            return 0;
        }
      });

      setSubscriptions(result);
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

  const totalCost = subscriptions
    .filter((sub) => sub.status)
    .reduce((acc, curr) => acc + curr.cost, 0);
  const averageExpenses = totalCost.toFixed(2);

  return (
    <Flex
      direction="column"
      bg="#ADC4CE"
      width="795px"
      minHeight="90vh"
      borderRadius="md"
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
          testId="add-edit-form"
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
