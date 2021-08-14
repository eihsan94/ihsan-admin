import React, { FC } from 'react'
import { Formik, Form, Field,  } from 'formik';
import * as Yup from 'yup';
import { Box, Stack, InputGroup, InputLeftElement, Input, Button, useToast, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import { useFormContext } from 'contexts/FormContext';
import NormalInputs, { InputTypes } from '@components/Inputs';



export interface InputField {
    name: string, 
    isRequired?: boolean,
    label: string, 
    placeholder?: string, 
    type: InputTypes;
    icon?: JSX.Element, 
    isInvalid: (errors: any, 
    touched: any) => boolean, 
    errors: (errors: any) => any
    dataLists?: any[];
}

export interface NormalFormAPiHandler {
    fn:  (...args: any) => any;
    url: (d?: any) => string;
    reqConfig?: AxiosRequestConfig;
}
export interface NormalFormProps  {
    inputFields: InputField[];
    apiHandler: NormalFormAPiHandler;
    formSchema:Yup.SchemaOf<any>
}

const NormalForm: FC<NormalFormProps> = ({inputFields, apiHandler, formSchema}) => {
    const toast = useToast()
    const {initialValues, submitFormCallBack} = useFormContext()
    
    const submitHandler = async (value: any) => {
        const {fn, url, reqConfig} = apiHandler
        const res = (await fn(url(value), value, reqConfig || {}))
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
                                                    dataLists={input.dataLists}
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

export default NormalForm
