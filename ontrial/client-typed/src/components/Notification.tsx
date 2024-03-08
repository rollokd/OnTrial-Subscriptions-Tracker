import { useRef, useState, useEffect } from 'react';
import { BellIcon } from '@chakra-ui/icons';
import { Box, Button, List, ListItem, Popover, PopoverTrigger, PopoverContent, PopoverBody, useOutsideClick, Text } from '@chakra-ui/react';
import apiService from '../services/apiService';
import { NOTIFICATION } from '../utils/definitions';

const Notification = () => {
  const [notifications, setNotifications] = useState<NOTIFICATION[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useOutsideClick({
    ref: popoverRef,
    handler: () => setIsOpen(false),
  });

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const notifications = await apiService.fetchNotifications();
        setNotifications(notifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  const renderMessage = (message: string) => {
    const parts = message.split('for ')[1].split(' is due');
    const subscriptionName = parts[0];
    return (
      <>
        Your subscription for{' '}
        <Text as="span" fontWeight="bold" fontSize="lg">
          {subscriptionName}
        </Text>
        {' '}is due tomorrow.
      </>
    );
  };

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button onClick={() => setIsOpen(!isOpen)} variant="ghost">
          <BellIcon w={6} h={6} />
          {notifications.length > 0 && (
            <Box as="span" ml={1} fontSize="xl" color="red.500">
              {notifications.length}
            </Box>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent ref={popoverRef}>
        <PopoverBody>
          {notifications.length === 0 ? (
            <Box>No new notifications</Box>
          ) : (
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification._id}>
                  {renderMessage(notification.message)}
                </ListItem>
              ))}
            </List>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;