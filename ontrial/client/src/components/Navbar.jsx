import {Box, Flex, Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import {HamburgerIcon , TriangleDownIcon} from '@chakra-ui/icons'

const Navbar = () => {

  return (
    <Box bg="red.800" w="100%" px={{ base: 2, md: 8 }} py={2} color={"black"}>
      <Flex justify="space-between" align="center" w="100%">
          <Flex>
            <Menu>
              <MenuButton as={Button} leftIcon={<HamburgerIcon/>} mr={4}>
              </MenuButton>
              <MenuList>
                <MenuItem>Alphabetic</MenuItem>
                <MenuItem>Bill Date</MenuItem>
                <MenuItem>Most Expensive</MenuItem>
                <MenuItem>Cheapest</MenuItem>
              </MenuList>
            </Menu>
            <Box flex="1"/>
            <Menu>
              <MenuButton as={Button} rightIcon={<TriangleDownIcon/>} position="absolute" left="50%" transform="translateX(-50%)">
                Filter Subscriptions
              </MenuButton>
                <MenuList>
                  <MenuItem>All Subscriptions</MenuItem>
                  <MenuItem>Active Subscriptions</MenuItem>
                  <MenuItem>Suspended Subscriptions</MenuItem>
                </MenuList>
              
            </Menu>
            <Box flex="1"/>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
