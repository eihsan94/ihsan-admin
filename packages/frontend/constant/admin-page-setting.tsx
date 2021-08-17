import NormalForm, { InputField } from "@components/Forms/NormalForm";
import { InputTypes } from "@components/Inputs";
import { NormalTableConfig } from "@components/tables/normal";
import { PermissionType } from "@libTypes/enums";
import { Role, User } from "@libTypes/types";
import { postSingle, updateSingle } from "@utils/crudUtil";
import * as Yup from 'yup';


const roleFormSchema: Yup.SchemaOf<Role> = Yup.object().shape({
    pk: Yup.string(),
    role_permissions: Yup.array<PermissionType[]>()
        .required('この項目は必須です。'),
    role_name: Yup.string()
        .required('この項目は必須です。'),
    price: Yup.number(),
    image: Yup.string(),
});
const roleInputFields: InputField[] = [
    {name: 'role_name', label: '権限名', placeholder: '権限名を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.role_name && touched.role_name), errors: (errors: any) => errors.role_name, isRequired: true},
    {name: 'role_permissions', label: '権限範囲', dataListsKey: 'ROLE_PERMISSIONS',  type: InputTypes.checkbox, isInvalid: (errors: any, touched: any) => !!(errors.role_permissions && touched.role_permissions), errors: (errors: any) => errors.role_permissions, isRequired: true},
    {name: 'price', label: '値段', placeholder: '値段を入れてください',  type: InputTypes.number, isInvalid: (errors: any, touched: any) => !!(errors.price && touched.price), errors: (errors: any) => errors.price},
] 
const userFormSchema: Yup.SchemaOf<User> = Yup.object().shape({
    pk: Yup.string(),
    id: Yup.string(),
    sk: Yup.string(),
    GSI1PK: Yup.string(),
    shop_pks:  Yup.array<string[]>(),
    name: Yup.string(),
    image: Yup.string(),
    password: Yup.string(),
    birthday: Yup.string(),
    ihsanPoint: Yup.number(),
    role_pk: Yup.string()
        .required('この項目は必須です。'),
    nickname:Yup.string(),
    type: Yup.string()
        .default('USER'),
    email: Yup.string()
        .required('この項目は必須です。'),
});
const userInputFields: InputField[] = [
    {name: 'image', label: '画像', placeholder: '画像を選択してください',  type: InputTypes.image, isInvalid: (errors: any, touched: any) => !!(errors.image && touched.image), errors: (errors: any) => errors.image},
    {name: 'email', label: 'メール', placeholder: 'メールを入れてください',  type: InputTypes.email, isInvalid: (errors: any, touched: any) => !!(errors.email && touched.email), errors: (errors: any) => errors.email},
    {name: 'password', label: 'パスワード', placeholder: 'パスワードを入れてください',  type: InputTypes.password, isInvalid: (errors: any, touched: any) => !!(errors.password && touched.password), errors: (errors: any) => errors.password},
    {name: 'role_pk', label: '権限名', placeholder: '権限名を選択してください',  dataListsKey: 'ROLES',type: InputTypes.dropdown, isInvalid: (errors: any, touched: any) => !!(errors.role_pk && touched.role_pk), errors: (errors: any) => errors.role_pk},
    {name: 'name', label: '名前', placeholder: '名前を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.name && touched.name), errors: (errors: any) => errors.name},
    {name: 'nickname', label: 'あだ名', placeholder: 'あだ名を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.nickname && touched.nickname), errors: (errors: any) => errors.nickname},
    {name: 'birthday', label: '生年月日', placeholder: '生年月日を入れてください',  type: InputTypes.text, isInvalid: (errors: any, touched: any) => !!(errors.birthday && touched.birthday), errors: (errors: any) => errors.birthday},
    {name: 'shop_pks', label: '店', placeholder: '店を選択してください', dataListsKey: 'SHOPS', type: InputTypes.checkbox, isInvalid: (errors: any, touched: any) => !!(errors.shop_pks && touched.shop_pks), errors: (errors: any) => errors.shop_pks},
    {name: 'ihsanPoint', label: 'イサンポイント', placeholder: 'イサンポイントを入れてください',  type: InputTypes.number, isInvalid: (errors: any, touched: any) => !!(errors.ihsanPoint && touched.ihsanPoint), errors: (errors: any) => errors.ihsanPoint},
] 

export const adminConfig: {

        role: NormalTableConfig,
        user: NormalTableConfig,
    } = {
        role: {
            caption: "ROLE TABLE",
            tableConfig: {
                th: ['権限名', '権限範囲', '値段 (円)'],
                td: [
                    {type: 'string', val:'role_name'},
                    {type: 'string', val:'role_permissions'},
                    {type: 'string', val:'price'},
                ],
            },
            modalFormConfig: {
                addModal: {title: () => `権限を追加します`, content: <NormalForm apiHandler={{fn: postSingle, url: () => 'roles'}} formSchema={roleFormSchema} inputFields={roleInputFields} />},
                editModal: {title: (d: Role) => `${d.role_name}`, content: <NormalForm apiHandler={{fn: updateSingle, url: (d: Role) => `roles/${d.pk}`}} formSchema={roleFormSchema} inputFields={roleInputFields} />},
                deleteModal: {title: (d: Role) => `${d.role_name}`},
            },
            tableCrudConfig: {
                deleteApi: {url: (d: Role) => `roles/${d.pk}`},
            },
        },
        user: {
            caption: "USER TABLE",
            tableConfig: {
                th: [
                    '画像',
                    '名前',
                    'メール',
                    '権限名',
                    '生年月日',
                    'イサンポイント',
                ],
                td: [
                    {type: 'image',val:'image'},
                    {type: 'string',val:'name'},
                    {type: 'string',val:'email'},
                    {type: 'string',val:'role_name'},
                    {type: 'string',val:'birthday'},
                    {type: 'string',val:'ihsanPoint'},
                ],
            },
            modalFormConfig:  {
                addModal: {title: () => `ユーザーを追加します`, content:  <NormalForm apiHandler={{fn: postSingle, url: () => 'users'}} formSchema={userFormSchema} inputFields={userInputFields} />},
                editModal: {title: (d: User) => `${d.name}`, content: <NormalForm apiHandler={{fn: updateSingle, url: (d: User) => `users/${d.id}`}} formSchema={userFormSchema} inputFields={userInputFields} />},
                deleteModal: {title: (d: User) => `${d.name}`},
            },
            tableCrudConfig: {
                deleteApi: {url: (d:  User) => `users/${d.id}`},
            },
        },
}