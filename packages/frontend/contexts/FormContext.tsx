import  { useState, createContext, FC, useContext } from "react";

// Create Context Object
const setFormInitValues = (arg: any) => {}
const toggleApiReq = () => {}
const submitFormCallBack = () => {}
export const FormContext = createContext({initialValues: {}, setFormInitValues, submitFormCallBack, toggleApiReq, formSubmitted: false});

// Create a provider for components to consume and subscribe to changes
export const FormContextProvider: FC = ({children}) => {
  const [initialValues, setInitialValues] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const setFormInitValues = (arg: any) => {
    setFormSubmitted(false)
    setInitialValues(arg)
  }
  const toggleApiReq = () => {
    setFormSubmitted(true)
    setFormSubmitted(false)
  }
  const submitFormCallBack = () =>{
    setFormSubmitted(true)
  }
  return (
    <FormContext.Provider value={{initialValues, setFormInitValues, submitFormCallBack, formSubmitted, toggleApiReq}}>
      {children}
    </FormContext.Provider>
  );
};
export  const useFormContext = () => useContext(FormContext);