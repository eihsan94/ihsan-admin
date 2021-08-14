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
    {name: 'role_permissions', label: '権限範囲', dataLists:[
        {name: 'ALL', val: 'ALL'},
        {name: 'CAN_EDIT_SHOP', val: 'CAN_EDIT_SHOP'},
        {name: 'CAN_EDIT_USER', val: 'CAN_EDIT_USER'},
        {name: 'CAN_EDIT_PROFILE', val: 'CAN_EDIT_PROFILE'},
        {name: 'CAN_EDIT_ROLE', val: 'CAN_EDIT_ROLE'},
        {name: 'CAN_EDIT_COURSE', val: 'CAN_EDIT_COURSE'},
        {name: 'CAN_EDIT_PERMISSION', val: 'CAN_EDIT_PERMISSION'},
        {name: 'CAN_SEE_ANALYTICS', val: 'CAN_SEE_ANALYTICS'},
        {name: 'CAN_HAVE_1_SHOP', val: 'CAN_HAVE_1_SHOP'},
        {name: 'CAN_HAVE_3_SHOP', val: 'CAN_HAVE_3_SHOP'},
        {name: 'CAN_HAVE_UNLIMITED_SHOP', val: 'CAN_HAVE_UNLIMITED_SHOP'},
        {name: 'CAN_HAVE_10_COURSE_MAX', val: 'CAN_HAVE_10_COURSE_MAX'},
        {name: 'CAN_HAVE_100_COURSE_MAX', val: 'CAN_HAVE_100_COURSE_MAX'},
        {name: 'CAN_HAVE_UNLIMITED_COURSE_MAX', val: 'CAN_HAVE_UNLIMITED_COURSE_MAX'},
    ],  type: InputTypes.checkbox, isInvalid: (errors: any, touched: any) => !!(errors.role_permissions && touched.role_permissions), errors: (errors: any) => errors.role_permissions, isRequired: true},
    {name: 'price', label: '値段', placeholder: '値段を入れてください',  type: InputTypes.number, isInvalid: (errors: any, touched: any) => !!(errors.price && touched.price), errors: (errors: any) => errors.price},
] 
// const userFormSchema: Yup.SchemaOf<User> = Yup.object().shape({
//     pk: Yup.string(),
//     role_permissions: Yup.array<PermissionType[]>()
//         .required('この項目は必須です。'),
//     role_name: Yup.string()
//         .required('この項目は必須です。'),
//     price: Yup.number(),
//     image: Yup.string(),
// });
// const roleInputFields: InputField[] = [
//     {name: 'role_name', label: '権限名', placeholder: '権限名を入れてください',  type: 'text', isInvalid: (errors: any, touched: any) => !!(errors.role_name && touched.role_name), errors: (errors: any) => errors.role_name, isRequired: true},
// ] 

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
                    'image',
                    'name',
                    'role_name',
                    'type',
                    'birthday',
                    'ihsanPoint',
                ],
                td: [
                    {type: 'image',val:'image'},
                    {type: 'string',val:'name'},
                    {type: 'string',val:'role_name'},
                    {type: 'string',val:'type'},
                    {type: 'string',val:'birthday'},
                    {type: 'string',val:'ihsanPoint'},
                ],
            },
            modalFormConfig:  {
                addModal: {title: () => `ユーザーを追加します`, content: <div>add user modal form</div>},
                editModal: {title: (d: User) => `${d.name}`, content: <div>edit user modal form</div>},
                deleteModal: {title: (d: User) => `${d.name}`, content: <div>delete user modal form</div>},
            },
            tableCrudConfig: {
                deleteApi: {url: (d: Role) => `roles/${d.pk}`},
            },
        },
}