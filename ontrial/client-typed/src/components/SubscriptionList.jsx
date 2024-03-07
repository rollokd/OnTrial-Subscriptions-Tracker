import SubscriptionItem from "./SubscriptionItem";
import { Flex, Box } from '@chakra-ui/react';
const SubscriptionList = ({onEdit, subscriptions}) => {



  return (
    <Flex direction="column" align="center" w="full" py={2}>
      <Box
        w="50%"
        maxW="lg"
        maxHeight="calc(100vh - 223px)" 
        overflowY="hidden"
        _hover={{ overflowY: "auto" }} 
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
            borderRadius: '4px',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent', 
          '&:hover': {
            scrollbarColor: '#888 #f0f0f0', 
          },
        }}
      >
        {subscriptions.map(subscription => (
          <SubscriptionItem key={subscription._id} subscription={subscription} onEdit={() => onEdit(subscription)} />
        ))}
      </Box>
    </Flex>
  );
};

export default SubscriptionList;