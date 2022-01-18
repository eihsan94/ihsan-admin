import { getLists, postSingle, updateSingle } from '@utils/crudUtil'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { InputTypes } from '@components/Inputs'
import { Role, User } from '@lib';
import MainTable, { MainTableConfig, TableFormConfig } from './mainTable';
import { useAppContext } from 'contexts/AppContext';


/**
 * @description the schema for form input validation
 */
const tableFormConfig: (role: Role[]) => TableFormConfig<User> = (roles:Role[]) => ({
    formSchema: Yup.object().shape({
        pk: Yup.string(),
        id: Yup.string(),
        sk: Yup.string(),
        GSI1PK: Yup.string(),
        shop_pks:  Yup.array<string[]>(),
        name: Yup.string(),
        image: Yup.string(),
        password: Yup.string(),
        birthday: Yup.string(),
        userPoint: Yup.number(),
        role_pk: Yup.string()
            .required('この項目は必須です。'),
        nickname:Yup.string(),
        type: Yup.string()
            .default('USER'),
        email: Yup.string()
            .required('この項目は必須です。'),
    }),
    inputFields:  [
        {
            name: 'role_pk', 
            label: '権限名', 
            placeholder: '権限名を選択してください', 
            type: InputTypes.dropdown, 
            inputChoices: roles.map(r => ({name: r.role_name, val: r.pk})),
            isInvalid: (errors: any, touched: any) => !!(errors.user_pk && touched.user_pk), 
            errors: (errors: any) => errors.user_pk
        },
        {name: 'name', label: '名前', placeholder: '名前を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.name && touched.name), errors: (errors: any) => errors.name},
        {name: 'email', label: 'メール', placeholder: 'メールを入れてください',  type: InputTypes.email, isInvalid: (errors: any, touched: any) => !!(errors.email && touched.email), errors: (errors: any) => errors.email},
    ],
})

/**
 * @description the User table config
 */
// const UserConfig: (roles: Role[]) => MainTableConfig =  (roles: Role[]) => {
const UserConfig: (roles: Role[]) => MainTableConfig =  (roles: Role[]) => {
    const {formSchema, inputFields} = tableFormConfig(roles)
    return {
        caption: "USER TABLE",
        tableConfig: {
            th: [
                '画像',
                '名前',
                'メール',
                '権限'
            ],
            td: [
                {type: 'image',val:'image'},
                {type: 'string',val:'name'},
                {type: 'string',val:'email'},
                {type: 'string',val:'role_name'},
            ],
        },
        modalFormConfig:  {
            addModal: {
                title: () => `ユーザーを追加します`, 
                formConfig:  {                    
                    apiHandler: {
                        fn: postSingle, 
                        url: () => 'users'
                    },
                    formSchema,
                    inputFields,
                } 
            },
            editModal: {
                title: (d: User) => `${d.name}`, 
                formConfig: {
                    apiHandler:{
                        fn: updateSingle, 
                        url: (d: User) => `users/${d.id}`
                    },
                    formSchema,
                    inputFields,
                },
            },
            deleteModal: {
                title: (d: User) => `${d.name}`,
                url: (d:  User) => `users/${d.id}`,
            },
        },
    }
}


/**
 * @description THE MAIN COMPONENT
 */
interface Props {
    users: User[]
}

export default function UserTable({users}: Props) {
    const {appState} = useAppContext()
    const [tableData, setTableData] = useState<User[]>(users);
    const fetchNewDataHandler = async() => {
        const data = await getLists<User[]>('users')
        setTableData(data)
    }
    return (
        <MainTable config={UserConfig(appState.roles)} data={tableData} submitFormCallBack={fetchNewDataHandler}/>

    )
}