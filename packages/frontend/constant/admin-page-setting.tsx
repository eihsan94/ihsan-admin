import NormalForm from "@components/Forms/NormalForm";
import { NormalTableConfig } from "@components/tables/normal";
import { Role, User } from "@libTypes/types";
import { postSingle, updateSingle } from "@utils/crudUtil";
import * as Yup from 'yup';


interface FormProps {

}

const formSchema: Yup.SchemaOf<FormProps> = Yup.object().shape({
    email: Yup.string()
        .email('メールアドレスが間違っています')
        .required('この項目は必須です。'),
    password: Yup.string()
        .min(6, '6文字以上を入れてください!')
        .required('この項目は必須です。'),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'パスワードが同じではない')
});

export const adminConfig: {
        role: NormalTableConfig,
        user: NormalTableConfig,
    } = {
        role: {
            caption: "ROLE TABLE",
            tableConfig: {
                th: ['ROLE NAME', 'PERMISSIONs', 'PRICE'],
                td: [
                    {type: 'string', val:'role_name'},
                    {type: 'string', val:'permissions'},
                    {type: 'string', val:'price'},
                ],
            },
            modalFormConfig: {
                addModal: {title: () => `権限を追加します`, content: <NormalForm apiHandler={{fn: postSingle, url: () => 'roles'}} formSchema={formSchema}/>},
                editModal: {title: (d: Role) => `${d.role_name}`, content: <NormalForm apiHandler={{fn: updateSingle, url: (d: Role) => `roles/${d.pk}`}} formSchema={formSchema}/>},
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
                    'email',
                    'type',
                    'birthday',
                    'ihsanPoint',
                ],
                td: [
                    {type: 'image',val:'image'},
                    {type: 'string',val:'name'},
                    {type: 'string',val:'email'},
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