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
    Button,
    Flex,
    Spinner,
    useToast,
  } from "@chakra-ui/react"
import NormalModal from "@components/modals/normal-modal"
import { deleteSingle, postSingle, updateSingle } from "@utils/crudUtil"
import { AxiosRequestConfig } from "axios"
import { useFormContext } from "contexts/FormContext"
import React, { FC, useState } from "react"
import { useEffect } from "react"

export interface TableConfig {
    th: string[];
    td: {type: 'string'| 'image', val: string | number}[];
}

export interface ModalFormConfig {
    addModal: {title: () => string, content: JSX.Element},
    editModal: {title: (d: any) => string, content: JSX.Element},
    deleteModal: {title: (d: any) => string, content?: JSX.Element},
}
export interface TableCrudConfig {
    // addApi: {url:string, reqConfig?:AxiosRequestConfig},
    // editApi: {url: (d: any) => string, reqConfig?:AxiosRequestConfig},
    deleteApi: {url: (d: any) => string, reqConfig?:AxiosRequestConfig},
}
export interface NormalTableConfig { // this is for the parents Components use
    caption?: string;
    tableConfig: TableConfig;
    modalFormConfig: ModalFormConfig;
    tableCrudConfig: TableCrudConfig;
}

interface Props extends TableProps {
    config: NormalTableConfig;
    data: any[] | null;
}

interface CustomTableProps extends TableProps {
    config?: NormalTableConfig;
    data?: any[] | null;
}

const NormalTable: FC<Props> = (props) => {
    const {config, data } = props
    const {caption, tableConfig, tableCrudConfig, modalFormConfig} = config
    const [currentData, setCurrentData] = useState<any>(null)
    const [modalTitle, setModalTitle] = useState<string>('')
    const [modalContent, setModalContent] = useState<string | JSX.Element>('')
    const [modalFooter, setModalFooter] = useState<JSX.Element>(<></>)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {setFormInitValues, formSubmitted } = useFormContext()
    const tableProps: CustomTableProps = {...props}
    delete tableProps.config
    delete tableProps.data
    
    useEffect(() => {
        if (formSubmitted) {
            onClose()
        }
    },[formSubmitted, onClose])

    const addHandler = () => {
        setCurrentData(true)
        setModalTitle(modalFormConfig.addModal.title())
        setModalContent(modalFormConfig.addModal.content)
        setModalFooter(<></>)
        setFormInitValues({})
        onOpen()
    }
    const editHandler = (d: any) => {
        setCurrentData(d)
        setModalTitle(modalFormConfig.editModal.title(d))
        setModalContent(modalFormConfig.editModal.content)
        setModalFooter(<></>)
        setFormInitValues(d)
        console.log(d);
        
        onOpen()
    }
    const deleteHandler = (d:any) => {
        setCurrentData(d)
        setModalTitle(`${modalFormConfig.deleteModal.title(d)}削除します`)
        setModalContent(<DeleteModalContent tableCrudConfig={tableCrudConfig} onClose={onClose} modalFormConfig={modalFormConfig} data={d}/>)
        onOpen()
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
                <NormalModal 
                    modalTitle={modalTitle} 
                    modalContent={modalContent}
                    modalFooter={modalFooter}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            }
        </Box>

    )
}

export default NormalTable

const prettifyData = (data: any) => Array.isArray(data)? data.map((d: any, i: number) => <div key={i}>{d}</div>) : data

interface DeleteModalProps {
    tableCrudConfig:TableCrudConfig;
    onClose: () => void;
    modalFormConfig: ModalFormConfig;
    data: any;
}
const DeleteModalContent:FC<DeleteModalProps> = ({tableCrudConfig, onClose, modalFormConfig, data}) => {
    const {toggleApiReq} = useFormContext()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const apiDeleteHandler = async(d: any) => {
        setIsLoading(true)
        const {url, reqConfig} = tableCrudConfig.deleteApi
        const res =  await deleteSingle(url(d), reqConfig)
        setIsLoading(false)
        toggleApiReq()
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
                {modalFormConfig.deleteModal.content || 'よろしいでしょうか？'}
            </Box>
            <Button variant="ghost" mr={3} onClick={onClose}>
                やめる
            </Button>
            <Button isLoading={isLoading} colorScheme="red" onClick={() => apiDeleteHandler(data)}>削除する</Button>
        </>
    )
}