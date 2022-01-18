import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { deleteSingle } from "@utils/crudUtil";
import React, { useState } from "react";
import { FC } from "react";

interface Props {
  id?: string,
  url: string,
  data: any,
  isOpen: boolean;
  modalTitle: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl"  ,
  submitFormCallBack: () => void
  onClose: () => void;
}

const DeleteModal: FC<Props> = ({data, isOpen, onClose, size, id, url, modalTitle, submitFormCallBack}) =>  {
  
    return (
      <Modal id={id} isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}削除します</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DeleteModalContent data={data} url={url} onClose={onClose} submitFormCallBack={submitFormCallBack}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  export default DeleteModal;

interface DeleteModalProps {
  url: string, 
  onClose: () => void;
  submitFormCallBack: () => void;
  data: any;
}

const DeleteModalContent:FC<DeleteModalProps> = ({url, onClose, data, submitFormCallBack}) => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const apiDeleteHandler = async(d: any) => {
        setIsLoading(true)
        const res =  await deleteSingle(url)
        setIsLoading(false)
            let error = ''
            if (res.data) {
                error = (res as unknown as {data: {error: string}}).data.error
            }
            const [title, description, status]: [string, string,  "error" | "info" | "warning" | "success" | undefined] = [
                error ? `エラー` : `正常`, 
                `${error || '正常に削除されました🙌🏻'}`,
                error ? 'error' : 'success',
            ]
            /**
             * @description this callback needed to trigger after submit actions like closing tht modal or fetching new data from server
             */
            if (!error) {
              submitFormCallBack()
              onClose()
            }
            return toast({
                title,
                description,
                status,
                duration: 5000,
                isClosable: true,
            })
        }
    return(
        <>
            <Box mb="5"> 
                よろしいでしょうか？
            </Box>
            <Button variant="ghost" mr={3} onClick={onClose}>
                やめる
            </Button>
            <Button isLoading={isLoading} colorScheme="red" onClick={() => apiDeleteHandler(data)}>削除する</Button>
        </>
    )
}