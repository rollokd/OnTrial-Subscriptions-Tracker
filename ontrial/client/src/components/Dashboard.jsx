import { useState } from 'react';
import {Box, Flex, Button, Text} from '@chakra-ui/react'
import SubscriptionList from './SubscriptionList';
import mockSubscriptions from '../mockSubscriptions';
import AddEditSubscriptionForm from './AddEditSubscriptionForm'

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  const handleEdit = (subscription) => {
    setCurrentSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentSubscription(null);
  }

  // Calculate average costs per month 
  const activeSubscriptions = mockSubscriptions.filter(sub => sub.status === 'Active');
  const totalCost = activeSubscriptions.reduce((acc, curr) => acc + curr.cost, 0);
  const averageExpenses = totalCost.toFixed(2);


  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Text fontSize="2xl" fontWeight="bold">Subscriptions</Text>
        <Button colorScheme="teal" onClick={() => setIsFormOpen(true)}>Add Subscription</Button>
        <AddEditSubscriptionForm 
        isOpen={isFormOpen} 
        onClose={handleClose}
        subscription={currentSubscription} />
      </Flex>
      <SubscriptionList onEdit={handleEdit}/>
      <Flex justifyContent="space-between" alignItems="center" p={4} bg="gray.200" bgopacity="0.8" borderRadius="md" mt={7} ml={2} mr={2}>
        <Box>
          <Text fontSize="lg">Average Expenses</Text>
          <Text fontSize="sm" as="i" fontStyle="italic">per month</Text>
        </Box>
        <Text fontSize="lg">${averageExpenses}</Text>
      </Flex>
    </Box>
  );
};

export default Dashboard;

