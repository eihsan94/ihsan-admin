import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: 'Montserrat, sans-serif'
      },
      html: {
        fontFamily: 'Montserrat, sans-serif'
      }
    }),
  },
};
