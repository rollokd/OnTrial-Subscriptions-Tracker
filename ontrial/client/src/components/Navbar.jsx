import { Box, Flex, Button, Menu, MenuButton, MenuList, MenuItem, Image, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, TriangleDownIcon } from '@chakra-ui/icons';

const Navbar = () => {
  return (
    <Flex justifyContent="center" w="full">
      <Box
        bg="orange.100"
        px={{ base: 2, sm: 4, md: 6 }}
        py={6}
        color="black"
        maxW={{ base: "90%", md: "80%", lg: "70%" }} // Adjust based on your preference
        w="full"
      >
        <Flex justify="space-between" align="center" w="100%">
          {/* Sort Menu */}
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
          
          <Spacer />
          
          {/* Logo Image */}
          <Box position="absolute" left="50%" top="5.2%" transform="translate(-50%, -50%)" zIndex="banner">
            <Image
              borderRadius='full'
              boxSize={{ base: '60px', sm: '90px', md: '180px', lg: '300px' }}
              objectFit="cover"
              src='../../public/logo.png'
              alt='Logo'
            />
          </Box>
          
          <Spacer />
          
          {/* Filter Subscriptions */}
          <Menu>
            <MenuButton as={Button} rightIcon={<TriangleDownIcon />}>
              Filter Subscriptions
            </MenuButton>
            <MenuList>
              <MenuItem>All Subscriptions</MenuItem>
              <MenuItem>Active Subscriptions</MenuItem>
              <MenuItem>Suspended Subscriptions</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
