import { ChakraProvider, CSSReset, GlobalStyle, Box } from '@chakra-ui/react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { useState } from 'react';
import theme from './theme/theme'; 


function App() {
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <Box
        minH="100vh"
        width="800px"
        marginX="auto"
        border="2px solid"
        borderColor="blue.300"
        borderRadius="xl">
        <Navbar setSortCriteria={setSortCriteria} setFilterCriteria={setFilterCriteria}/>
        <Dashboard sortCriteria={sortCriteria} filterCriteria={filterCriteria} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
