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
} from '@chakra-ui/react'

const AddEditSubscriptionForm = ({ isOpen, onClose, subscription}) => {
 const [name, setName] = useState('');
 const [cost, setCost] = useState('');
 const [billingDate, setBillingDate] = useState('');
 const [endDate, setEndDate] = useState('');

 useEffect(()=> {
  if (subscription){
   setName(subscription.name);
   setCost(subscription.cost.toString())
   setBillingDate(subscription.billingDate);
   setEndDate(subscription.endDate || '');
  }else{
   resetForm();
  }
 }, [subscription,isOpen]);

   // Reset form fields to default
  const resetForm = () => {
    setName('');
    setCost('');
    setBillingDate('');
    setEndDate('');
  };

 // func to handle the form submission 
 const handleSubmit = (e) => {
  e.preventDefault();
  const formData = { name, cost: parseFloat(cost), billingDate, endDate };
  console.log(formData);
  onClose();
 };

 return (
  <Modal isOpen={isOpen} onClose={() => { onClose(); resetForm(); }}>
   <ModalOverlay />
   <ModalContent>
    <ModalHeader>Add/Edit Subscription</ModalHeader>
    <form onSubmit={handleSubmit}>
     <ModalBody>
      <FormControl>
       <FormLabel>Name</FormLabel>
       <Input value={name} onChange={(e)=>setName(e.target.value)}/>
      </FormControl>
      <FormControl>
       <FormLabel>Cost</FormLabel>
       <Input value={cost} onChange={(e)=>setCost(e.target.value)}/>
      </FormControl>
      <FormControl>
       <FormLabel>End Date</FormLabel>
       <Input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
      </FormControl>
      <FormControl>
       <FormLabel>Billing Date</FormLabel>
       <Input type="date" value={billingDate} onChange={(e)=>setBillingDate(e.target.value)}/>
      </FormControl>
     </ModalBody>
     <ModalFooter>
      <Button colorScheme="yellow" mr={3} type="submit">
       Save
      </Button>
      <Button variant="ghost" onClick={() => { onClose(); resetForm(); }}>
       Cancel
      </Button>
     </ModalFooter>
    </form>
   </ModalContent>
  </Modal>
 )
}

export default AddEditSubscriptionForm;