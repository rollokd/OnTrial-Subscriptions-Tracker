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
  Switch,
} from "@chakra-ui/react";
import { generateToastConfig } from "../utils/toastUtils";
import apiService from "../services/apiService";
import { Subscription } from "../utils/definitions";
import { getInputType, getMinMax, toCapitalCase } from "../utils/helper";

// Initial form
const initialFormState = {
  name: "",
  cost: 0,
  billingDate: "",
  // endDate: "",
  status: true,
};

const AddEditSubscriptionForm = ({
  isOpen,
  onClose,
  subscription,
  refreshSubscriptions,
}: {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
  refreshSubscriptions: () => Promise<void>;
}) => {
  const [formData, setFormData] = useState<Subscription>(initialFormState);
  const toast = useToast();

  useEffect(() => {
    setFormData(
      subscription && isOpen
        ? {
            name: subscription.name.trim() || "",
            cost: subscription.cost || 0,
            billingDate: subscription.billingDate?.slice(0, 10) || "",
            // endDate: subscription.endDate?.slice(0, 10) || "", TODO: add endData implementation
            status: subscription.status,
          }
        : initialFormState
    );
  }, [subscription, isOpen]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      const subscriptionData = {
        ...formData,
        status: formData.status,
        cost: Number(formData.cost),
      };

      const data =
        subscription && subscription._id
          ? // TODO: check subscription prop type for null
            await apiService.updateSubscription(
              subscription._id,
              subscriptionData
            )
          : await apiService.addSubscription(subscriptionData);

      toast(
        generateToastConfig(
          subscription ? "updateSuccess" : "addSuccess",
          data.name
        )
      );
      onClose();
      refreshSubscriptions();
    } catch (error) {
      console.error("Error:", error);
      toast(
        generateToastConfig("error", "Unable to update or add subscription")
      );
    }
  };

  const handleDelete = async () => {
    if (!subscription || !subscription._id) return;

    try {
      await apiService.deleteSubscription(subscription._id);
      toast(generateToastConfig("deleteSuccess"));
      onClose();
      refreshSubscriptions();
    } catch (error) {
      console.error("Error:", error);
      toast(generateToastConfig("error", "Unable to delete subscription"));
    }
  };

  const [min, max] = getMinMax();

  const formInputs = [];
  for (const [key, value] of Object.entries(formData)) {
    if (key === "_id" || key === "status") continue;
    formInputs.push(
      <FormControl key={key} mt={key !== "name" ? 4 : 0} isRequired>
        <FormLabel>{toCapitalCase(key)}</FormLabel>
        <Input
          name={key}
          type={getInputType(key)}
          value={value.toString()}
          onChange={handleChange}
          min={min}
          max={max}
        />
      </FormControl>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {subscription ? "Edit Subscription" : "Add Subscription"}
        </ModalHeader>
        <form onSubmit={handleSubmit} data-testid={"add-edit-form"}>
          <ModalBody pb={6}>
            {/* Form fields */}
            {formInputs}
            <FormControl mt={4} display="flex" alignItems="center">
              <FormLabel htmlFor="status" mb="0">
                Suspend
              </FormLabel>
              <Switch
                id="status"
                name="status"
                isChecked={formData.status}
                onChange={handleChange}
                mx={2}
              />
              <FormLabel mb="0"> Active </FormLabel>
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
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default AddEditSubscriptionForm;
