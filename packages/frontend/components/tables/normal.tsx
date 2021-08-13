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
  } from "@chakra-ui/react"
import NormalModal from "@components/modals/normal-modal"
import { User } from "@libTypes/types"
import { deleteSingle, postSingle, updateSingle } from "@utils/crudUtil"
import { AxiosRequestConfig } from "axios"
import React, { FC, useState } from "react"

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
    data: any[];
}

interface CustomTableProps extends TableProps {
    config?: NormalTableConfig;
    data?: any[];
}

const NormalTable: FC<Props> = (props) => {
    const {config, data } = props
    const {caption, tableConfig, tableCrudConfig, modalFormConfig} = config
    const [currentData, setCurrentData] = useState<any>(null)
    const [modalTitle, setModalTitle] = useState<string>('')
    const [modalContent, setModalContent] = useState<string | JSX.Element>('')
    const [modalFooter, setModalFooter] = useState<JSX.Element>(<></>)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const tableProps: CustomTableProps = {...props}
    delete tableProps.config
    delete tableProps.data
    
    const addHandler = () => {
        setCurrentData(true)
        setModalTitle(modalFormConfig.addModal.title())
        setModalContent(modalFormConfig.addModal.content)
        setModalFooter(<></>)
        onOpen()
    }
    const editHandler = (d: User) => {
        setCurrentData(d)
        setModalTitle(modalFormConfig.editModal.title(d))
        setModalContent(modalFormConfig.editModal.content)
        setModalFooter(<></>)
        onOpen()
    }
    const deleteHandler = (d:any) => {
        setCurrentData(d)
        setModalTitle(`${modalFormConfig.deleteModal.title(d)}削除します`)
        setModalContent(modalFormConfig.deleteModal.content || 'よろしいでしょうか？')
        setModalFooter(
            <>
                <Button variant="ghost" mr={3} onClick={onClose}>
                    やめる
                </Button>
                <Button isLoading={isLoading} colorScheme="red" onClick={async() => {
                    const {url, reqConfig} = tableCrudConfig.deleteApi
                    setIsLoading(true)
                    await deleteSingle(url(d), reqConfig)
                }}>削除する</Button>
            </>
        )
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
                    {data.map((d, i) => 
                        <Tr key={i}>
                            {tableConfig.td.map((c, ci) => <Td key={ci}>{c.type === 'image' ? <Image src={d[c.val]} fallbackSrc={d[c.val]} alt={d[c.val]}/> : d[c.val]}</Td>)}
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

                    )}
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
