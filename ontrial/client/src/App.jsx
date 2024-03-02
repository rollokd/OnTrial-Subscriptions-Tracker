import { ChakraProvider, CSSReset, extendTheme, GlobalStyle, Box } from '@chakra-ui/react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';


const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bgGradient: 'linear(to-tr, #96B6C5, #ADC4CE, #EEE0C9, #F1F0E8)',
        fontFamily: "'Poppins', sans-serif",
      },
    }),
  },
});

function App() {
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
        <Navbar/>
        <Dashboard />
      </Box>
    </ChakraProvider>
  );
}

export default App;
