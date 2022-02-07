import { mode } from "@chakra-ui/theme-tools";

export const primaryColorHex = "#4FD1C5"
export const primaryColorRgba = (opacityVal: number) => `rgba(79, 209, 197, ${opacityVal || 1})`


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
