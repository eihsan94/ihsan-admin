import { getLists, postSingle, updateSingle } from 'core/utils/crudUtil'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { InputTypes } from '@components/Inputs'
import { PermissionType, Role } from '@lib';
import { InputChoice } from '@contexts/FormContext';
import { useAppContext } from '@contexts/AppContext';
import MainTable, { TableFormConfig, MainTableConfig } from './MainTable';


export const RoleChoices: InputChoice[] = [
    { name: PermissionType.ALL, val: PermissionType.ALL },
    { name: PermissionType.CAN_EDIT_ROLE, val: PermissionType.CAN_EDIT_ROLE },
    { name: PermissionType.CAN_EDIT_USER, val: PermissionType.CAN_EDIT_USER },
    { name: PermissionType.CAN_SEE_ANALYTICS, val: PermissionType.CAN_SEE_ANALYTICS },
    { name: PermissionType.CAN_EDIT_PROFILE, val: PermissionType.CAN_EDIT_PROFILE },
]

/**
 * @description the schema for form input validation
 */
const tableFormConfig: TableFormConfig<Role> = {
    formSchema: Yup.object().shape({
        pk: Yup.string(),
        role_permissions: Yup.array<PermissionType[]>()
            .required('この項目は必須です。'),
        role_name: Yup.string()
            .required('この項目は必須です。'),
    }),
    inputFields: [
        {
            name: 'role_name',
            label: '権限名',
            placeholder: '権限名を入れてください',
            type: InputTypes.text,
            isInvalid: (errors: any, touched: any) => !!(errors.role_name && touched.role_name),
            errors: (errors: any) => errors.role_name,
            isRequired: true
        },
        {
            name: 'role_permissions',
            label: '権限範囲',
            inputChoices: RoleChoices,
            type: InputTypes.checkbox,
            isInvalid: (errors: any, touched: any) => !!(errors.role_permissions && touched.role_permissions),
            errors: (errors: any) => errors.role_permissions,
            isRequired: true
        },
    ],
}

/**
     * @description the Role table config
     */
const RoleConfig: MainTableConfig = {
    caption: "ROLE TABLE",
    tableConfig: {
        th: ['権限名', '権限範囲'],
        td: [
            { type: 'string', val: 'role_name' },
            { type: 'string', val: 'role_permissions' },
        ],
    },
    modalFormConfig: {
        addModal: {
            title: () => `権限を追加します`,
            formConfig: {
                apiHandler: {
                    fn: postSingle,
                    url: () => 'roles',
                },
                formSchema: tableFormConfig.formSchema,
                inputFields: tableFormConfig.inputFields,
            },
        },
        editModal: {
            title: (d: Role) => `${d.role_name}`,
            formConfig: {
                apiHandler: { fn: updateSingle, url: (d: Role) => `roles/${d.pk}` },
                formSchema: tableFormConfig.formSchema,
                inputFields: tableFormConfig.inputFields,
            }
        },
        deleteModal: {
            title: (d: Role) => `${d.role_name}`,
            url: (d: Role) => `roles/${d.pk}`,
        },
    },
}

/**
 * @description THE MAIN COMPONENT
 */
interface Props {
    roles: Role[]
}

export default function RoleTable({ roles }: Props) {
    const [tableData, setTableData] = useState<Role[]>(roles);
    const { setCurrentAppState, appState } = useAppContext()
    const fetchNewDataHandler = async () => {
        const data = await getLists<Role[]>('roles')
        setTableData(data)
        const newState = { ...appState }
        newState.roles = data
        setCurrentAppState(newState)
    }

    return (
        <MainTable config={RoleConfig} data={tableData} submitFormCallBack={fetchNewDataHandler} />
    )
}