import NormalForm, { InputField } from '@components/Forms/NormalForm'
import { postSingle, updateSingle } from '@utils/crudUtil'
import React from 'react'
import NormalTable, { NormalTableConfig, TableFormConfig } from './normal'
import * as Yup from 'yup';
import { InputTypes } from '@components/Inputs'
import { PermissionType, Role } from '@lib';


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
    inputFields:  [
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
            inputChoices: [
                {name: PermissionType.ALL, val: PermissionType.ALL},
                {name: PermissionType.CAN_EDIT_PROFILE, val: PermissionType.CAN_EDIT_PROFILE},
                {name: PermissionType.CAN_EDIT_PROFILE, val: PermissionType.CAN_EDIT_PROFILE},
            ],
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
const RoleConfig: NormalTableConfig = {
    caption: "ROLE TABLE",
    tableConfig: {
        th: ['権限名', '権限範囲'],
        td: [
            {type: 'string', val:'role_name'},
            {type: 'string', val:'role_permissions'},
        ],
    },
    modalFormConfig: {
        addModal: {title: () => `権限を追加します`, content: <NormalForm apiHandler={{fn: postSingle, url: () => 'roles'}} formSchema={tableFormConfig.formSchema} inputFields={tableFormConfig.inputFields} />},
        editModal: {title: (d: Role) => `${d.role_name}`, content: <NormalForm apiHandler={{fn: updateSingle, url: (d: Role) => `roles/${d.pk}`}} formSchema={tableFormConfig.formSchema} inputFields={tableFormConfig.inputFields} />},
        deleteModal: {title: (d: Role) => `${d.role_name}`},
    },
    tableCrudConfig: {
        deleteApi: {url: (d: Role) => `roles/${d.pk}`},
    },
}


/**
 * @description THE MAIN COMPONENT
 */
interface Props {
    roles: Role[]
}

export default function RoleTable({roles}: Props) {
    return (
        <NormalTable config={RoleConfig} data={roles} />
    )
}