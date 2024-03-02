import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem, Text,} from '@chakra-ui/react';
import { HamburgerIcon, TriangleDownIcon } from '@chakra-ui/icons';

const Navbar = () => {
  return (
      <Box
        bg="#ADC4CE"
        px={{ base: 2, sm: 2, md: 4 }}
        color='black'
        w='795px'
        borderRadius='lg'
        mb={1}
        position='relative'
        textAlign="center"
      >
        <Flex 
        justifyContent='space-between'
        alignItems='center' 
        w='full'>
        <Menu>
          <MenuButton as={Button} leftIcon={<HamburgerIcon />} mr={4}>
            Sort
          </MenuButton>
          <MenuList>
            <MenuItem>Alphabetic</MenuItem>
            <MenuItem>Bill Date</MenuItem>
            <MenuItem>Most Expensive</MenuItem>
            <MenuItem>Cheapest</MenuItem>
          </MenuList>
        </Menu>

        <Flex flexDirection="column" align="center">
          <Text fontSize="4xl" fontWeight="bold" fontFamily="'Poppins', sans-serif" color="teal"
          as="i">
          onTrial
          </Text>
          <Text fontSize="sm" color="gray.500" fontFamily="'Poppins', sans-serif"
          as="i">
          subscriptions tracker
          </Text>
        </Flex>

        <Menu>
          <MenuButton as={Button} rightIcon={<TriangleDownIcon />}>
            Filter
          </MenuButton>
          <MenuList>
            <MenuItem>All Subscriptions</MenuItem>
            <MenuItem>Active Subscriptions</MenuItem>
            <MenuItem>Suspended Subscriptions</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
