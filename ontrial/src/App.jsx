
import { ChakraProvider } from '@chakra-ui/react';
import { SubscriptionsProvider } from './context/SubscriptionsContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ChakraProvider>
      <SubscriptionsProvider>
        <Dashboard />
      </SubscriptionsProvider>
    </ChakraProvider>
  );
}

export default App;
