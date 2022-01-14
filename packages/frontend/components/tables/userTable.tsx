import NormalForm, { InputField } from '@components/Forms/NormalForm'
import { postSingle, updateSingle } from '@utils/crudUtil'
import React from 'react'
import NormalTable, { NormalTableConfig, TableFormConfig } from './normal'
import * as Yup from 'yup';
import { InputTypes } from '@components/Inputs'
import { User } from '@lib';


/**
 * @description the schema for form input validation
 */
const tableFormConfig: TableFormConfig<User> = {
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
        {name: 'image', label: '画像', placeholder: '画像を選択してください',  type: InputTypes.image, isInvalid: (errors: any, touched: any) => !!(errors.image && touched.image), errors: (errors: any) => errors.image},
        {name: 'email', label: 'メール', placeholder: 'メールを入れてください',  type: InputTypes.email, isInvalid: (errors: any, touched: any) => !!(errors.email && touched.email), errors: (errors: any) => errors.email},
        {name: 'password', label: 'パスワード', placeholder: 'パスワードを入れてください',  type: InputTypes.password, isInvalid: (errors: any, touched: any) => !!(errors.password && touched.password), errors: (errors: any) => errors.password},
        {name: 'user_pk', label: '権限名', placeholder: '権限名を選択してください',  dataListsKey: 'ROLES',type: InputTypes.dropdown, isInvalid: (errors: any, touched: any) => !!(errors.user_pk && touched.user_pk), errors: (errors: any) => errors.user_pk},
        {name: 'name', label: '名前', placeholder: '名前を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.name && touched.name), errors: (errors: any) => errors.name},
        {name: 'nickname', label: 'あだ名', placeholder: 'あだ名を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.nickname && touched.nickname), errors: (errors: any) => errors.nickname},
        {name: 'birthday', label: '生年月日', placeholder: '生年月日を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.birthday && touched.birthday), errors: (errors: any) => errors.birthday},
        {name: 'shop_pks', label: '店', placeholder: '店を選択してください', dataListsKey: 'SHOPS', type: InputTypes.checkbox, isInvalid: (errors: any, touched: any) => !!(errors.shop_pks && touched.shop_pks), errors: (errors: any) => errors.shop_pks},
        {name: 'userPoint', label: 'ユーザーポイント', placeholder: 'ユーザーポイントを入れてください',  type: InputTypes.number, isInvalid: (errors: any, touched: any) => !!(errors.userPoint && touched.userPoint), errors: (errors: any) => errors.userPoint},
    ],
}

/**
 * @description the User table config
 */
const UserConfig: NormalTableConfig = {
    caption: "USER TABLE",
    tableConfig: {
        th: [
            '画像',
            '名前',
            'メール',
            '権限名',
            '生年月日',
            'ユーザーポイント',
        ],
        td: [
            {type: 'image',val:'image'},
            {type: 'string',val:'name'},
            {type: 'string',val:'email'},
            {type: 'string',val:'user_name'},
            {type: 'string',val:'birthday'},
            {type: 'string',val:'userPoint'},
        ],
    },
    modalFormConfig:  {
        addModal: {title: () => `ユーザーを追加します`, content:  <NormalForm apiHandler={{fn: postSingle, url: () => 'users'}} formSchema={tableFormConfig.formSchema} inputFields={tableFormConfig.inputFields} />},
        editModal: {title: (d: User) => `${d.name}`, content: <NormalForm apiHandler={{fn: updateSingle, url: (d: User) => `users/${d.id}`}} formSchema={tableFormConfig.formSchema} inputFields={tableFormConfig.inputFields} />},
        deleteModal: {title: (d: User) => `${d.name}`},
    },
    tableCrudConfig: {
        deleteApi: {url: (d:  User) => `users/${d.id}`},
    },
}


/**
 * @description THE MAIN COMPONENT
 */
interface Props {
    users: User[]
}

export default function UserTable({users}: Props) {
    return (
        <NormalTable config={UserConfig} data={users} />
    )
}