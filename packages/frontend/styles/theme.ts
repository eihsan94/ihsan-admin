// theme.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Button: {
        baseStyle: {
          fontWeight: "bold", // Normally, it is "semibold"
        },
    
    //   // 2. We can add a new button size or extend existing
    //   sizes: {
    //     xl: {
    //       h: "56px",
    //       fontSize: "lg",
    //       px: "32px",
    //     },
    //   },
      // 3. We can add a new visual variant
        variants: {
            "primary": {
                bg: "orange.300",
                color: "white",
                _hover:{ bg: "orange.400"},
                // boxShadow: "0 0 2px 2px #efdfde",
            },
            "accent": {
                bg: "blue.500",
                color: "white",
                _hover:{ bg: "blue.600"},
            },
    //     // 4. We can override existing variants
    //     solid: (props) => ({
    //       bg: props.colorMode === "dark" ? "red.300" : "red.500",
    //     }),
      },
    },
  },
})

export default theme