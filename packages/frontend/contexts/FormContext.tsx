import  { useState, createContext, FC, useContext } from "react";

interface FormDataList{
  key: string, 
  val: {name: string, val: any}[],
}
// Create Context Object
const setFormInitValues = (arg: any) => {}
const toggleApiReq = () => {}
const submitFormCallBack = () => {}
const setInitialDataLists =  (fdl: FormDataList[]) => {}
const initDataLists: FormDataList[] = []

export const FormContext = createContext({initialValues: {}, setFormInitValues, submitFormCallBack, toggleApiReq, formSubmitted: false, initDataLists, setInitialDataLists});

// Create a provider for components to consume and subscribe to changes
export const FormContextProvider: FC = ({children}) => {
  const [initialValues, setInitialValues] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [initDataLists, setInitDataLists] = useState<FormDataList[]>([]);
  const setInitialDataLists = (FDL: FormDataList[])  => {
    const IDL = [...initDataLists]
    FDL.map(fdl => {
      const i = initDataLists.findIndex(dl => dl.key === fdl.key)
      i > -1
      ? IDL[i].val = fdl.val
      : IDL.push(fdl)
    })
    setInitDataLists(IDL)
  }
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
    <FormContext.Provider value={{initialValues, setFormInitValues, submitFormCallBack, formSubmitted, toggleApiReq, initDataLists, setInitialDataLists}}>
      {children}
    </FormContext.Provider>
  );
};
export  const useFormContext = () => useContext(FormContext);