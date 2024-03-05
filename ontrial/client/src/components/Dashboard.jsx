import { useEffect, useState, useCallback } from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import SubscriptionList from './SubscriptionList';
import AddEditSubscriptionForm from './AddEditSubscriptionForm';

const Dashboard = ({ sortCriteria, filterCriteria }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  // Define applySortAndFilter inside useCallback to memoize it
  const applySortAndFilter = useCallback((data) => {
    let result = data;

    // Filter
    if (filterCriteria !== 'all') {
      result = result.filter(sub => 
        filterCriteria === 'active' ? sub.status === 'Active' : sub.status === 'Suspended'
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortCriteria) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'billDate':
          return new Date(a.billingDate) - new Date(b.billingDate);
        case 'mostExpensive':
          return b.cost - a.cost;
        case 'cheapest':
          return a.cost - b.cost;
        default:
          return 0;
      }
    });

    setSubscriptions(result);
  }, [filterCriteria, sortCriteria]);

  // Fetch and refresh subscriptions
  const refreshSubscriptions = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/subscriptions');
      const data = await response.json();
      applySortAndFilter(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  }, [applySortAndFilter]);

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  const handleEdit = (subscription) => {
    setCurrentSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentSubscription(null);
    refreshSubscriptions(); // Refresh the subscriptions list after closing the form
  };

  const totalCost = subscriptions
    .filter(sub => sub.status === 'Active')
    .reduce((acc, curr) => acc + curr.cost, 0);
  const averageExpenses = (totalCost / (subscriptions.filter(sub => sub.status === 'Active').length || 1)).toFixed(2); // Adjust to handle division by zero

  return (
    <Flex direction="column" bg="#ADC4CE" width="795px" minHeight="90vh" borderRadius="md" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">Subscriptions</Text>
        <Button colorScheme="teal" onClick={() => setIsFormOpen(true)}>Add Subscription</Button>
      </Flex>
      <Box flex="1" overflowY="auto">
        <SubscriptionList subscriptions={subscriptions} onEdit={handleEdit} />
      </Box>
      {isFormOpen && (
        <AddEditSubscriptionForm 
          isOpen={isFormOpen} 
          onClose={handleClose} 
          subscription={currentSubscription}
          refreshSubscriptions={refreshSubscriptions} // Pass this function to the form for use after edits
        />
      )}
      <Flex justifyContent="space-between" alignItems="center" p={2} bg="gray.200" borderRadius="xl">
        <Box borderRadius="lg">
          <Text fontSize="xl">Average Expenses</Text>
          <Text fontSize="sm" as="i" fontStyle="italic">per month</Text>
        </Box>
        <Text fontSize="xl">${averageExpenses}</Text>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
