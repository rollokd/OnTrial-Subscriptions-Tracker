import { ChakraProvider, Container } from '@chakra-ui/react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';


function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" px={20}>
        <Navbar/>
        <Dashboard />
      </Container>
    </ChakraProvider>
  );
}

export default App;
