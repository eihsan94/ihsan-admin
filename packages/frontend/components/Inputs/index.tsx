import { Box, Checkbox, CheckboxGroup, Input, Select, SelectField } from '@chakra-ui/react'
import { useFormContext } from 'contexts/FormContext'
import React, { ChangeEventHandler, FC, ReactText } from 'react'

export enum InputTypes {
    number='number',
    email='email',
    text='text',
    image='image',
    password='password',
    dropdown='dropdown',
    checkbox='checkbox',
}
interface Props {
    field: any;
    id: string;
    type: InputTypes;
    dataListsKey?: string
    placeholder?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const NormalInputs: FC<Props> = ({ field, id, type, placeholder, dataListsKey, setFieldValue}) => {    
    const checkBoxChanged =(value: ReactText[]) => {
        setFieldValue(field.name, value)
    }
    const dropdownChanged =(evt: any) => {
        const value = evt.target.value
        setFieldValue(field.name, value)
    }
    const {initDataLists} = useFormContext()
    const lists = dataListsKey ? initDataLists.find(dl => dl.key === dataListsKey)?.val : []
    return (
        <>
            {(
                type === InputTypes.number || 
                type === InputTypes.email || 
                type === InputTypes.password || 
                type === InputTypes.text
            )
                &&
                <Input 
                    {...field}
                    id={id}
                    rounded="full" 
                    size="lg" 
                    h={16}
                    type={type} 
                    placeholder={placeholder}
                    color={'gray.500'}
                    _placeholder={{
                        color: 'gray.300',
                    }}
                />}
            {type === InputTypes.checkbox
                &&
                <CheckboxGroup colorScheme="orange" defaultValue={field.value} onChange={checkBoxChanged}>
                    <Box pl="6">
                        {lists?.map((d, i) => <Box key={i}><Checkbox value={d.val}>{d.name}</Checkbox></Box>)}
                    {!lists && 'この項目のデータはまだございません'}
                    </Box>
                </CheckboxGroup>
            }
            {type === InputTypes.dropdown
                &&
                <Select colorScheme="orange" placeholder={placeholder} defaultValue={field.value} rounded="full" size="lg" h={16} onChange={dropdownChanged}>
                    {lists?.map((d, i) => <option key={i} value={d.val}>{d.name}</option>)}
                </Select>
            }
            {type === InputTypes.image
                &&
                'image input we put later'
            }
            
        </>
    )
}

export default NormalInputs
