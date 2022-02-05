import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, ButtonProps, useColorMode } from '@chakra-ui/react';
import React from 'react'

interface Props extends ButtonProps { }

function DarkModeBtn(props: Props) {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button {...props} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

export default DarkModeBtn
