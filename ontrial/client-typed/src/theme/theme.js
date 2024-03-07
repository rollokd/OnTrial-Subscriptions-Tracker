import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-tr, #96B6C5, #ADC4CE, #EEE0C9, #F1F0E8)',
        fontFamily: "'Poppins', sans-serif",
      },
    },
  },
});

export default theme;