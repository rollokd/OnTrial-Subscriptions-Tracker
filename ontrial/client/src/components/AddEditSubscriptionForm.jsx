import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Switch
} from '@chakra-ui/react';

const AddEditSubscriptionForm = ({ isOpen, onClose, subscription, refreshSubscriptions }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true); 
  const toast = useToast();

  useEffect(() => {
    if (subscription && isOpen) {
      setName(subscription.name);
      setCost(subscription.cost.toString());
      setBillingDate(subscription.billingDate.slice(0, 10));
      setEndDate(subscription.endDate ? subscription.endDate.slice(0, 10) : '');
      setIsActive(subscription.status === 'Active');
    } else {
      resetForm();
    }
  }, [subscription, isOpen]);

  const resetForm = () => {
    setName('');
    setCost('');
    setBillingDate('');
    setEndDate('');
    setIsActive(true);
  };

  const handleDelete = () => {
    if (subscription && subscription._id) {
      fetch(`http://localhost:3000/subscriptions/${subscription._id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        toast({
          title: 'Subscription deleted.',
          description: "The subscription has been successfully deleted.",
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        onClose();
        refreshSubscriptions();
      })
      .catch(error => {
        console.error('Error:', error);
        toast({
          title: 'An error occurred.',
          description: "Unable to delete the subscription.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = subscription ? `http://localhost:3000/subscriptions/${subscription._id}` : 'http://localhost:3000/subscriptions';
    const method = subscription ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        cost: parseFloat(cost), 
        billingDate, 
        endDate,
        status: isActive ? 'Active' : 'Suspended'}),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      toast({
        title: subscription ? 'Subscription updated.' : 'Subscription added.',
        description: `The subscription "${data.name}" has been successfully ${subscription ? 'updated' : 'added'}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      resetForm();
      onClose();
      refreshSubscriptions(); 
    })
    .catch((error) => {
      console.error('Error:', error);
      toast({
        title: 'An error occurred.',
        description: error.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); resetForm(); }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{subscription ? 'Edit Subscription' : 'Add Subscription'}</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cost</FormLabel>
              <Input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Billing Date</FormLabel>
              <Input type="date" value={billingDate} onChange={(e) => setBillingDate(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="status-toggle" mb="6" mt={4}>
                Suspend
              </FormLabel>
              <Switch id="status-toggle" isChecked={isActive} onChange={() => setIsActive(!isActive)}/>
              <FormLabel ml={4} mt={1}>Active</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {subscription && (
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={() => { onClose(); resetForm(); }}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditSubscriptionForm;
