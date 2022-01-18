import { useToast } from '@chakra-ui/react'
import React, { FC } from 'react'

interface Props {
    res: any;
}

const Toaster:FC<Props> = ({res}) => {
    const toast = useToast()
    let error = ''
    if (res.data) {
        error = (res as unknown as {data: {error: string}}).data.error
    }
    const [title, description, status]: [string, string,  "error" | "info" | "warning" | "success" | undefined] = [
        error ? `エラー` : `正常`, 
        `${error || '正常に保存されました🙌🏻'}`,
        error ? 'error' : 'success',
    ]
    toast({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
    })
    return <></>
}

export default Toaster
