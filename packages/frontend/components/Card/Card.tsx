import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
interface Props extends BoxProps {
  variant?: string
}
function Card(props: Props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default Card;
