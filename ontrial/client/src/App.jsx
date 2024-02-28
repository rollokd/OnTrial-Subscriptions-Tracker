import { ChakraProvider, Container } from '@chakra-ui/react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import SubscriptionList from './components/SubscriptionList';

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" px={20}>
        <Navbar/>
        <Dashboard />
        <SubscriptionList/>
      </Container>
    </ChakraProvider>
  );
}

export default App;
