import { useToast } from '@chakra-ui/react'
import { useFormContext } from 'contexts/FormContext'
import React, { FC } from 'react'

interface Props {
    res: any;
}

const Toaster:FC<Props> = ({res}) => {
    const toast = useToast()
    const {submitFormCallBack} = useFormContext()
    let error = ''
    if (res.data) {
        error = (res as unknown as {data: {error: string}}).data.error
    }
    const [title, description, status]: [string, string,  "error" | "info" | "warning" | "success" | undefined] = [
        error ? `エラー` : `正常`, 
        `${error || '正常に保存されました🙌🏻'}`,
        error ? 'error' : 'success',
    ]
    /**
     * @description this callback needed to trigger after submit actions like closing tht modal or fetching new data from server
     */
    if (!error) {
        submitFormCallBack() 
    }
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
