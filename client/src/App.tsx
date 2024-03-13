import { ChakraProvider, CSSReset, GlobalStyle, Flex } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { useState } from "react";
import theme from "./theme/theme";
import { Sorting, Filtering } from "./utils/definitions";

function App() {
  const [sortCriteria, setSortCriteria] = useState<Sorting>("billDate");
  const [filterCriteria, setFilterCriteria] = useState<Filtering>("all");

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <Flex
        direction={"column"}
        height="100vh"
        width="75%"
        marginX="auto"
        border="2px solid"
        borderColor="blue.300"
        borderRadius="xl"
      >
        <Navbar
          setSortCriteria={setSortCriteria}
          setFilterCriteria={setFilterCriteria}
        />
        <Dashboard
          sortCriteria={sortCriteria}
          filterCriteria={filterCriteria}
        />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
