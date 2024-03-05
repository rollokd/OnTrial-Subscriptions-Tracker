export const generateToastConfig = (type, data) => {
  switch (type) {
    case 'deleteSuccess':
      return {
        title: 'Subscription deleted.',
        description: "The subscription has been successfully deleted.",
        status: 'info',
        duration: 3000,
        isClosable: true,
      };
    case 'addSuccess':
      return {
        title: 'Subscription added.',
        description: `The subscription "${data.name}" has been successfully added.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      };
    case 'updateSuccess':
      return {
        title: 'Subscription updated.',
        description: `The subscription "${data.name}" has been successfully updated.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      };
    case 'error':
      return {
        title: 'An error occurred.',
        description: data ? data.toString() : "Unable to process the request.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      };
    default:
      return {};
  }
};