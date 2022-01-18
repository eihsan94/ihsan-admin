import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableProps,
    Image,
    IconButton,
    Box,
    useDisclosure,
    Flex,
    Spinner,
  } from "@chakra-ui/react"
import DeleteModal from "@components/modals/delete-modal"
import FormModal from "@components/modals/form-modal"
import { InputField, NormalFormAPiHandler, useFormContext } from "contexts/FormContext"
import React, { FC, useState } from "react"
import * as Yup from 'yup';

export interface TableFormConfig<T> {
    formSchema: Yup.SchemaOf<T>,
    inputFields: InputField[],
}
export interface TableConfig {
    th: string[];
    td: {type: 'string'| 'image', val: string | number}[];
}

interface FormConfig {
    formSchema: Yup.SchemaOf<any>,
    inputFields: InputField[], 
    apiHandler: NormalFormAPiHandler,
}
export interface ModalFormConfig {
    addModal: {
        title: () => string,
        formConfig: FormConfig,
    },
    editModal: {
        title: (d: any) => string,
        formConfig: FormConfig,
    },
    deleteModal: {
        title: (d: any) => string,
        url: (d: any) => string,
    },
}
export interface MainTableConfig { // this is for the parents Components use
    caption?: string;
    tableConfig: TableConfig;
    modalFormConfig: ModalFormConfig;
}

interface Props extends TableProps {
    config: MainTableConfig;
    data: any[] | null;
    submitFormCallBack: () => void;
}

interface CustomTableProps extends TableProps {
    config?: MainTableConfig;
    data?: any[] | null;
}

const MainTable: FC<Props> = (props) => {
    const {config, data, submitFormCallBack } = props
    const {setFormInitValues, setInputFields, setApiHandler, setFormSchema} = useFormContext()
    const {caption, tableConfig, modalFormConfig} = config
    // FOR MODAL USE CASE
    const [currentData, setCurrentData] = useState<any>(null)
    // FOR FORM MODAL
    const [modalTitle, setModalTitle] = useState<string>('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    // FOR DELETE MODAL
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    // FOR TABLE PROPS
    const tableProps: CustomTableProps = {...props}
    delete tableProps.config
    delete tableProps.data

    const addHandler = () => {
        const {formSchema,apiHandler,inputFields} = modalFormConfig.addModal.formConfig
        setFormInitValues({})
        setCurrentData(true)
        setModalTitle(modalFormConfig.addModal.title())
        setFormSchema(formSchema)
        setApiHandler(apiHandler)
        setInputFields(inputFields)
        onOpen()
    }
    const editHandler = (d: any) => {
        setFormInitValues(d)  
        const {formSchema,apiHandler,inputFields} = modalFormConfig.editModal.formConfig
        setCurrentData(d)
        setModalTitle(modalFormConfig.editModal.title(d))
        setFormSchema(formSchema)
        setApiHandler(apiHandler)
        setInputFields(inputFields)
        onOpen()
    }
    const deleteHandler = (d:any) => {
        setCurrentData(d)
        setModalTitle(modalFormConfig.deleteModal.title(d))
        onOpenDelete()
    }
    return (
        <Box overflowX="auto" p="4">
            <Table variant="simple" borderRadius="1em" px="4" shadow="xl" {...tableProps}>
                <TableCaption>{caption}</TableCaption>
                <Thead>
                    <Tr>
                        {tableConfig.th.map((h, i) => <Th key={i}>{h}</Th>)}
                        <Th>    
                            <Flex justify="flex-end">
                                <IconButton
                                    rounded="full"
                                    variant="accent"
                                    aria-label="Add Data to table"
                                    icon={<AddIcon />}
                                    onClick={addHandler}
                                />
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data
                        ?data.map((d, i) => 
                            <Tr key={i}>
                                {tableConfig.td.map((c, ci) => <Td key={ci}>{c.type === 'image' ? <Image rounded="xl" src={d[c.val]} fallbackSrc={d[c.val]} alt={d[c.val]}/> : prettifyData(d[c.val])}</Td>)}
                                <Td>
                                    <Flex justify="flex-end">
                                        <IconButton
                                            rounded="full"
                                            variant="primary"
                                            aria-label="Edit Data in table"
                                            icon={<EditIcon />}
                                            onClick={() => editHandler(d)}
                                        />
                                        <IconButton
                                            ml="2"
                                            rounded="full"
                                            aria-label="Delete Data in table"
                                            icon={<DeleteIcon />}
                                            onClick={() => deleteHandler(d)}
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        )
                        : <Tr>
                            <Td> 
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="orange.300"
                                    size="lg"
                                />
                            </Td>
                        </Tr>
                }
                </Tbody>
            </Table>
            {currentData &&
                <FormModal 
                    modalTitle={modalTitle}
                    submitFormCallBack={() => {
                        onClose()
                        submitFormCallBack()
                    }}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            }
            {currentData &&
                <DeleteModal 
                    data={currentData}
                    modalTitle={modalTitle}
                    url={modalFormConfig.deleteModal.url(currentData)}
                    isOpen={isOpenDelete}
                    onClose={onCloseDelete}
                    submitFormCallBack={() => {
                        onClose()
                        submitFormCallBack()
                    }}
                />
            }
        </Box>

    )
}

export default MainTable

const prettifyData = (data: any) => Array.isArray(data)? data.map((d: any, i: number) => <div key={i}>{d}</div>) : data

