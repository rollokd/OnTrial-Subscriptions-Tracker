import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Sorting, Filtering } from "../utils/definitions";
import { toCapitalCase } from "../utils/helper";

const Navbar = ({
  setSortCriteria,
  setFilterCriteria,
}: {
  setSortCriteria: React.Dispatch<React.SetStateAction<Sorting>>;
  setFilterCriteria: React.Dispatch<React.SetStateAction<Filtering>>;
}) => {
  const handleSortSelection = (criteria: Sorting) => {
    setSortCriteria(criteria);
  };

  const handleFilterSelection = (criteria: Filtering) => {
    setFilterCriteria(criteria);
  };

  const sortingOptions: Sorting[] = [
    "alphabetical",
    "billDate",
    "mostExpensive",
    "cheapest",
  ];

  const sortMenuItems = sortingOptions.map((item, index) => {
    return (
      <MenuItem key={index} onClick={() => handleSortSelection(item)}>
        {toCapitalCase(item)}
      </MenuItem>
    );
  });

  const filterOptions: Filtering[] = ["all", "active", "suspended"];

  const filterMenuItems = filterOptions.map((item, index) => {
    return (
      <MenuItem key={index} onClick={() => handleFilterSelection(item)}>
        {toCapitalCase(item)} Subscriptions
      </MenuItem>
    );
  });

  return (
    <Box
      bg="#ADC4CE"
      px={{ base: 2, sm: 2, md: 4 }}
      color="black"
      w="auto"
      borderRadius="lg"
      mb={1}
      position="relative"
      textAlign="center"
    >
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <Menu>
          <MenuButton as={Button} leftIcon={<HamburgerIcon />} mr={4}>
            Sort
          </MenuButton>
          <MenuList>{sortMenuItems}</MenuList>
        </Menu>

        <Flex flexDirection="column" align="center">
          <Text
            fontSize="4xl"
            fontWeight="bold"
            fontFamily="'Poppins', sans-serif"
            color="teal"
            as="i"
          >
            onTrial
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            fontFamily="'Poppins', sans-serif"
            as="i"
          >
            subscriptions tracker
          </Text>
        </Flex>

        <Menu>
          <MenuButton as={Button} rightIcon={<TriangleDownIcon />}>
            Filter
          </MenuButton>
          <MenuList>{filterMenuItems}</MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
