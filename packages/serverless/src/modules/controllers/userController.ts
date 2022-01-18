
import expressAsyncHandler from 'express-async-handler'
import { getAll, postSingle, getAllUser, putSingleUser, deleteSingleUser } from '../utils/crudUtil'
import {  validatePassword } from '../utils/encryptionUtil'
import * as uuid from 'uuid'
import { Role, User, UserDashboard } from '@lib'

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
*/
const getUsers = expressAsyncHandler(async ({res}) => {
  try {
    const users = (await getAllUser('USER')).json
    const roles = (await getAll('pk', 'roles')).json
    const fUsers = users.map((u:User) => ({...u, role_name: roles.find((r: Role) => r.pk === u.role_pk).role_name}))
    return res.status(200).json(fUsers)
  } catch (error) {
    return res.status(500).json({error})
  }
})


/**
 * @desc    Get all users info including sessions and accounts provided by the provider
 * @route   GET /api/users
 * @access  Private/Admin
*/
const getAllUserInfo = expressAsyncHandler(async ({res}) => {
  const result = await getAllUser('')
  return res.status(result.status).json(result.json)
})

/**
 * @desc    Get all users dashboard including sessions, shops, roles, other init data
 * @route   GET /api/users
 * @access  Private/Admin
*/
const getUserLatest = expressAsyncHandler(async (req,res) => {
  try {
    const dashboard = await generateDashboard((req as any).user)
    return res.status(dashboard.status).json(dashboard)
  } catch (error) {
    return res.status(error.status).json({error})
  }
})

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  all
*/
const getUserById = expressAsyncHandler(async (req, res) => {
  const result = await getAll('id', req.params.id, '-user')
  const user = result.json[0]
  return res.status(result.status).json(user)
})


/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
*/
const registerUser = expressAsyncHandler(async (req, res) => {
  const timestamp = new Date().getTime()
  const user: User = req.body
  const users = (await getAll('email', user.email, '-user')).json
  const userExist = users.length >0 
  if (userExist) {
    const isRegisteredWithGoogle = users.filter((u: User) => u.GSI1PK).length > 0
    return res.status(400).json({error: isRegisteredWithGoogle ?  `このメールはすでにgoogleで登録されたので, googleでログインしてください` : `このメールはすでに登録されています。`})
  }
  
  const id= uuid.v4()
  const Item = {
    pk: `USER#${id}`,
    sk: `USER#${id}`,
    id,
    notLinked: true,
    role_pk: user.role_pk,
    email: user.email,
    name: user.name,
    type: 'USER',
    createdAt: timestamp,
    updatedAt: timestamp
  }
  try {
    await postSingle(Item, '-user')
    // await postSingle(OAuthItem, '-user')
    return res.status(200).json({message:"user created"})
  } catch (error) {
    return res.status(error.status).json(error)
  }
})

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
*/ 
const deleteUser = expressAsyncHandler(async (req, res) => {
  const id  = req.params.id
  const result = await deleteSingleUser(id)
  return res.status(result.status).json(result.json)
})

/**
 * @desc    Update user profile
 * @route   PUT /api/users
 * @access  Private
 */
const updateUser = expressAsyncHandler(async (req, res) => {
  const id  = req.params.id
  const oldUser = (await getAll('id', id, '-user')).json[0]
  if (!oldUser) {
    return res.status(422).json({error: `このユーザーは存在しません`})
  }
  const user: User = req.body
  console.log(oldUser);
  
  const keyValArr = [
    {key: 'role_pk', val: user.role_pk} ,
    {key: 'shop_pks', val: user.shop_pks} ,
    {key: 'email', val: user.email} ,
    {key: 'nickname', val: user.nickname} ,
    {key: '#name', val: user.name, isReservedKeyword: true} ,
    {key: 'image', val: user.image} ,
    {key: 'birthday', val: user.birthday} ,
    {key: 'userPoint', val: user.userPoint} ,
  ]
  const result = await putSingleUser(oldUser.pk, oldUser.sk, keyValArr)
  return res.status(result.status).json(result.json)
})
/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  const date = new Date();
  date.setDate(date.getDate() + 10);
  const users = (await getAll('email', email, '-user')).json
  // CHECK IF EMAIL IS REGISTERED USING GOOGLE
  if (users.filter((u: User) => u.GSI1PK)[0]) {
    return res.status(401).json({error: 'このアカウントはgoogleで登録されたのでgoogleでログインしてください😭'})
  }
  const user = users[0]
  if (!user) {
    return res.status(401).json({error: 'このアカウントはまだ登録されていません😢'})
  }

  if (user && (await validatePassword(password, user.password))) {
    // const user_roles = await Role.find({_id: { "$in" : user.role_ids}})
    // const user_role_types = user_roles.map(r => r.type)
    delete user.password
    res.json(user)
  } else {
    res.status(401).json({error: 'メールアドレスもしくはパスワードが異なります😢'})
  }
})

export {
  getUsers,
  getUserById,
  deleteUser,
  getAllUserInfo,
  updateUser,
  registerUser,
  authUser,
  getUserLatest,
}

const generateDashboard = async (user: User) => {
  const defaultMenus = [
    {label: 'ホーム', href: '/'},
  ]
  let dashboard: UserDashboard = {status: 200, json: {menus: defaultMenus}}
  try {
    
    const roles = (await getAll('pk', 'roles')).json
    const isAdmin = roles.find((r:Role) => r.role_name === 'ADMIN').pk === user.role_pk
    /**
     * @role isAdmin
     * @description {roles, users}
     */
    if (isAdmin) {
      const users = (await getAllUser('USER')).json
      const fUsers = users.map((u:User) => {
        const currRole = roles.find((r: Role) => r.pk === u.role_pk)
        const role_name = currRole ? currRole.role_name : u.role_pk
        return (
          {...u, role_name}
        )
      })
      dashboard.json = {
        menus: [
          ...defaultMenus,
          {label: '全ショップ管理',href: '/all-shop'},
        ],
        admin: {
          roles, 
          users:fUsers,
        }
      }
    }
  } catch (error) {
    dashboard = {status: 500, json: error}
  }
  return dashboard
}