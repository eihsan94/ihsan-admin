import { useToast } from '@chakra-ui/react'

export interface ErrorProps {
    message: string,
    status: number,
}

const useErrorToaster = () => {

    const toast = useToast()
    return {
        errorToast: ({ message, status }: ErrorProps) => toast({
            status: "error",
            title: `Error - ${status}`,
            description: message
        })
    }

}

export default useErrorToaster