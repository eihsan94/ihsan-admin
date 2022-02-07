import { ChevronLeftIcon } from '@chakra-ui/icons'
import { BoxProps, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

function BackBtn(props: BoxProps) {
    const router = useRouter()

    const onClickHandler = () => {
        router.back()
    }

    return (
        <Flex onClick={onClickHandler} {...props} border="solid 1px #F0F1F5" justifyContent={"center"} alignItems={"center"}>
            <ChevronLeftIcon fontSize={"1.5em"} />
        </Flex>
    )
}

export default BackBtn
