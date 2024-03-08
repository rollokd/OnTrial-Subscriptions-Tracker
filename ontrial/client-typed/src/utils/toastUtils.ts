import { UseToastOptions } from "@chakra-ui/react";

export const generateToastConfig = (type: string, data?: string) => {
  switch (type) {
    case 'deleteSuccess':
      return {
        title: 'Subscription deleted.',
        description: "The subscription has been successfully deleted.",
        status: 'info',
        duration: 3000,
        isClosable: true,
      } as UseToastOptions;
    case 'addSuccess':
      return {
        title: 'Subscription added.',
        description: `The subscription "${data}" has been successfully added.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      } as UseToastOptions;
    case 'updateSuccess':
      return {
        title: 'Subscription updated.',
        description: `The subscription "${data}" has been successfully updated.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      } as UseToastOptions;
    case 'error':
      return {
        title: 'An error occurred.',
        description: data || "Unable to process the request.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      } as UseToastOptions;
    default:
      return {} as UseToastOptions;
  }
};