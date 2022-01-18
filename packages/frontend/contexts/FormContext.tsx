import { InputTypes } from "@components/Inputs";
import { AxiosRequestConfig } from "axios";
import  { useState, createContext, FC, useContext } from "react";
import * as Yup from 'yup';


export interface InputChoice {
  name: any, 
  val: any,
}
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
  inputChoices?: InputChoice[]
}

export interface NormalFormAPiHandler {
  fn:  (...args: any) => any;
  url: (d?: any) => string;
  reqConfig?: AxiosRequestConfig;
}


// Create Context Object
const setFormInitValues = (arg: any) => {}
// CALLBACK AFTER FORM IS SUBMITTED
const submitFormCallBack = () => {}

const setInputFields = (arg: any) => {}
const inputFieldsInit: InputField[] = []

const setApiHandler = (arg: any) => {}
const apiHandlerInit: NormalFormAPiHandler = {
  fn : () => {},
  url : () => '/',
}

const formSchemaInit: Yup.SchemaOf<any> = {} as any
const setFormSchema = (arg: any) => {}

const setFormTitle = (arg: any) => {}

export const FormContext = createContext({
  initialValues: {}, 
  setFormInitValues, 
  submitFormCallBack, 
  apiHandler: apiHandlerInit, setApiHandler,
  inputFields: inputFieldsInit, setInputFields,
  formSchema: formSchemaInit, setFormSchema,
  formTitle:'', setFormTitle,
});

// Create a provider for components to consume and subscribe to changes
export const FormContextProvider: FC = ({children}) => {
  const [initialValues, setInitialValues] = useState({});
  const [formTitle, setTitle] = useState('');
  const [apiHandler, setApiHandler] = useState({
    fn : () => {},
    url : () => '/',
  });
  const [formSchema, setFormSchema] = useState<Yup.SchemaOf<any>>({} as any)
  const [inputFields, setInputFields] = useState([])

  
  
  const setFormInitValues = (arg: any) => {
    setInitialValues(arg)
  }
  const setFormTitle = (arg:any) => {
    setTitle(arg)
  }
  return (
    <FormContext.Provider value={{
        initialValues, 
        setFormInitValues, 
        submitFormCallBack, 
        formSchema, 
        setFormSchema,
        apiHandler,
        setApiHandler,
        inputFields, 
        setInputFields, 
        formTitle, 
        setFormTitle
      }}>
      {children}
    </FormContext.Provider>
  );
};
export  const useFormContext = () => useContext(FormContext);