import { Box, BoxProps, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props extends BoxProps {
  date?: any
  title?: any
  logo?: any
  index?: any
  arrLength?: any
}

function TimelineRow(props: Props) {
  const { logo, title, date, color, index, arrLength } = props;
  const textColor = useColorModeValue("gray.700", "white.300");
  const bgIconColor = useColorModeValue("white.300", "gray.700");
  const [rightIcon, setRightIcon] = useState<any>()
  const [leftIcon, setLeftIcon] = useState<any>()

  useEffect(() => {
    setRightIcon(document.documentElement.dir === "rtl" ? "-8px" : "")
    setLeftIcon(document.documentElement.dir === "rtl" ? "" : "-8px")
  }, [])

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
      <Flex direction="column" h="100%">
        <Icon
          as={logo}
          bg={bgIconColor}
          color={color}
          h={"30px"}
          w={"26px"}
          pe="6px"
          zIndex="1"
          position="relative"
          right={rightIcon}
          left={leftIcon}
        />
        <Box
          w="2px"
          bg="gray.200"
          h={index === arrLength - 1 ? "15px" : "100%"}
        ></Box>
      </Flex>
      <Flex direction="column" justifyContent="flex-start" h="100%">
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="normal">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}

export default TimelineRow;
