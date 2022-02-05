import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
interface Props extends BoxProps {
  variant?: any
}
function CardBody(props: Props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
