import { Box, Checkbox, CheckboxGroup, Input, SelectField } from '@chakra-ui/react'
import React, { FC, ReactText } from 'react'

export enum InputTypes {
    number='number',
    text='text',
    image='image',
    dropdown='dropdown',
    checkbox='checkbox',
}
interface Props {
    field: any;
    id: string;
    type: InputTypes;
    dataLists?: {name: string,val: any}[];
    placeholder?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const NormalInputs: FC<Props> = ({ field, id, type, placeholder, dataLists, setFieldValue}) => {    
    const checkBoxChanged =(value: ReactText[]) => {
        setFieldValue(field.name, value)
    }
    return (
        <>
            {(
                type === InputTypes.number || 
                type === InputTypes.text)
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
                        {dataLists?.map((d, i) => <Box key={i}><Checkbox value={d.val}>{d.name}</Checkbox></Box>)}
                    </Box>
                </CheckboxGroup>
            }
        </>
    )
}

export default NormalInputs
