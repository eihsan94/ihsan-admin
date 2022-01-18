import { Box, Button, FormControl, FormErrorMessage, FormLabel, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { Formik, Form, Field,  } from 'formik';
import { AxiosRequestConfig } from 'axios';
import { InputField, useFormContext } from 'contexts/FormContext';
import NormalInputs, { InputTypes } from '@components/Inputs';

interface Props {
  id?: string,
  modalTitle: string | JSX.Element,
  submitFormCallBack: () => void,
  isOpen: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl"  ,
  onClose: () => void;
}

const FormModal: FC<Props> = ({modalTitle, submitFormCallBack, isOpen, onClose, size, id}) =>  {
  
    return (
      <Modal id={id} isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormComponent submitFormCallBack={submitFormCallBack}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  export default FormModal;


interface FormComponentProps {
    submitFormCallBack: () => void;
}
const FormComponent:FC<FormComponentProps> = ({submitFormCallBack}) => {
    const toast = useToast()
    const {initialValues, formSchema, inputFields, apiHandler} = useFormContext()

    const submitHandler = async (value: any) => {        
        const {fn, url, reqConfig} = apiHandler
        const res = (await fn(url(value), value, reqConfig || {})) // we make it like this because the form value for the API in this component
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
        return toast({
            title,
            description,
            status,
            duration: 5000,
            isClosable: true,
        })
        
    }
    return (
        <Box mt={5}>
            <Stack spacing={4}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={(value) => submitHandler(value)}
                >
                  {({errors, touched, isSubmitting, setFieldValue}) => (
                      <Form>
                        {inputFields && inputFields.map((input: InputField, i) =>
                            <Field name={input.name} key={i}>
                                {({ field }: {field: {name: string, value: string}}) => (
                                    <FormControl isInvalid={input.isInvalid(errors, touched)} mb="5" isRequired={input.isRequired }>
                                        <FormLabel ml="6">{input.label}</FormLabel>
                                        <InputGroup>
                                            {input.icon&&
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    >
                                                    {input.icon}
                                                </InputLeftElement>
                                            }
                                            {/* add dropdown selection in form control input maybe make the input component below to be a new component that switch base on input types */}
                                                <NormalInputs 
                                                    field={{...field}}
                                                    id={input.name}
                                                    placeholder={input.placeholder}
                                                    type={input.type} 
                                                    inputChoices={input.inputChoices}
                                                    setFieldValue={setFieldValue}
                                                />
                                        </InputGroup>
                                        <FormErrorMessage ml="6">{input.errors(errors)}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        )} 
                        <Button
                            isLoading={isSubmitting}
                            type="submit"
                            rounded="full" 
                            variant="primary"
                            >
                            保存
                        </Button>
                    </Form>
                  )}
              </Formik>
            </Stack>
        </Box>   
    )
}
