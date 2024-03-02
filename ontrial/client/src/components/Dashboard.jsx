import { useEffect, useState } from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import SubscriptionList from './SubscriptionList';
import AddEditSubscriptionForm from './AddEditSubscriptionForm';

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = () => {
    fetch('http://localhost:3000/subscriptions')
      .then(response => response.json())
      .then(data => setSubscriptions(data))
      .catch(error => console.error('Error fetching subscriptions:', error));
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleEdit = (subscription) => {
    setCurrentSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentSubscription(null);
    fetchSubscriptions();
  };

  // Calculate total costs per month for active subscriptions
  const totalCost = subscriptions
    .filter(sub => sub.status === 'Active')
    .reduce((acc, curr) => acc + curr.cost, 0);
  const averageExpenses = totalCost.toFixed(2);

  return (
    <Box 
      bg="#ADC4CE"
      width="795px"
      borderRadius="md">

      <Flex justifyContent="space-between" alignItems="center" p={4}>
          {/** SUBS Text */}
          <Text fontSize="2xl" fontWeight="bold">Subscriptions</Text>

          {/** ADDSUBS Text */}
          <Button colorScheme="teal" onClick={() => setIsFormOpen(true)}>
            Add Subscription
          </Button>
        </Flex>
        <SubscriptionList subscriptions={subscriptions} onEdit={handleEdit} />
        <AddEditSubscriptionForm 
          isOpen={isFormOpen} 
          onClose={handleClose} 
          subscription={currentSubscription} 
          refreshSubscriptions={fetchSubscriptions} 
        />
        <Flex justifyContent="space-between" alignItems="center" p={2} bg="gray.200" w="795px"
        borderRadius="xl">
          <Box borderRadius="lg">
            <Text fontSize="xl">Average Expenses</Text>
            <Text fontSize="sm" as="i" fontStyle="italic">per month</Text>
          </Box>
          <Text fontSize="xl">${averageExpenses}</Text>
        </Flex>
      </Box>
  );
};

export default Dashboard;
