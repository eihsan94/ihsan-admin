// theme.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold", // Normally, it is "semibold"
      },
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
      },
    },
  },
})

export default theme