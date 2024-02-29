import {Box, Flex, Button, Text} from '@chakra-ui/react'
import SubscriptionList from './SubscriptionList';
import mockSubscriptions from '../mockSubscriptions';

const Dashboard = () => {
  // Calculate average costs per month 
  const activeSubscriptions = mockSubscriptions.filter(sub => sub.status === 'Active');
  const totalCost = activeSubscriptions.reduce((acc, curr) => acc + curr.cost, 0);
  const averageExpenses = activeSubscriptions.length > 0 ? (totalCost / activeSubscriptions.length).toFixed(2) : '0.00';


  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Text fontSize="2xl" fontWeight="bold">Subscriptions</Text>
        <Button colorScheme="teal" onClick={() => console.log('Add Subscription')}>Add Subscription</Button>
      </Flex>
      <SubscriptionList/>
      <Flex justifyContent="space-between" alignItems="center" p={4} bg="gray.200" bgOpacity="0.8" borderRadius="md" mt={7} ml={2} mr={2}>
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

