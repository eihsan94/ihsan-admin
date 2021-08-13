import React, { FC } from 'react'
import { Formik, Form, Field,  } from 'formik';
import * as Yup from 'yup';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Box, Stack, InputGroup, InputLeftElement, Input, Button, useToast, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';



type InputField = {name: string, placeholder: string, type: string, icon: JSX.Element, isInvalid: (errors: any, touched: any) => boolean, errors: (errors: any) => any}

export interface NormalFormAPiHandler {
    fn:  (...args: any) => any;
    url: (d?: any) => string;
    reqConfig?: AxiosRequestConfig;
}
export interface NormalFormProps  {
    inputFields?: InputField[];
    apiHandler: NormalFormAPiHandler;
    formSchema:Yup.SchemaOf<any>
}
const NormalForm: FC<NormalFormProps> = ({inputFields, apiHandler, formSchema}) => {
    const toast = useToast()

    inputFields = [
        {name: 'email', placeholder: 'メールアドレス',  type: 'email',  icon: <EmailIcon color="gray.300" fontSize="1.2em" ml="8px" mt="25px"/>, isInvalid: (errors, touched) => !!(errors.email && touched.email), errors: (errors: any) => errors.email},
        {name: 'password', placeholder: 'パスワード',  type: 'password',  icon: <LockIcon color="gray.300" fontSize="1.2em" ml="10px" mt="20px"/>, isInvalid: (errors, touched) => !!(errors.password && touched.password), errors: (errors: any) => errors.password},
    ] 
    const submitHandler = async (value: any) => {
        const {fn, url, reqConfig} = apiHandler
        console.log(value);
        const res = (await fn(url(), value, reqConfig || {}))
        const error = (res as unknown as {data: {error: string}}).data.error
        const [title, description, status]: [string, string,  "error" | "info" | "warning" | "success" | undefined] = [
            error ? `エラー` : `正常`, 
            `${error || '正常に保存されました🙌🏻'}`,
            error ? 'error' : 'success',
        ]
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
                    initialValues={{email: '', password: '', passwordConfirmation: '' }}
                    validationSchema={formSchema}
                    onSubmit={(value) => submitHandler(value)}
                >
                  {({errors, touched, isSubmitting}) => (
                      <Form>
                        {inputFields && inputFields.map((input: InputField, i) =>
                            <Field name={input.name} key={i}>
                                {({ field }: {field: {name: string, value: string}}) => (
                                    <FormControl isInvalid={input.isInvalid(errors, touched)} mb="5">
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    >
                                                    {input.icon}
                                                </InputLeftElement>
                                                <Input 
                                                    {...field}
                                                    id={input.name}
                                                    rounded="full" 
                                                    size="lg" 
                                                    h={16}
                                                    type={input.type} 
                                                    placeholder={input.placeholder}
                                                    color={'gray.500'}
                                                    _placeholder={{
                                                        color: 'gray.300',
                                                    }}
                                                />
                                            </InputGroup>
                                        <FormErrorMessage>{input.errors(errors)}</FormErrorMessage>
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
