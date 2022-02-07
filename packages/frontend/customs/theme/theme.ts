// theme.js
import { coreTheme } from "core/theme/theme"
import { globalStyles } from "./styles"

const customThemes = {
    ...globalStyles,
    components: {},
}

const theme = coreTheme(customThemes)

export default theme