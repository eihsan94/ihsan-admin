import expressAsyncHandler from 'express-async-handler'
import {Role} from '@libTypes/types'
import * as uuid from 'uuid'
import { deleteSingle, getAll, getSingle, postSingle, putSingle } from '../utils/crudUtil'

const partitionKeyPrefix = 'roles'
/**
 * @desc    Get all roles
 * @route   GET /api/roles
 * @access  Private/Admin
*/
const getRoles = expressAsyncHandler(async ({res}) => {
  const result = await getAll('pk', partitionKeyPrefix)
  return res.status(result.status).json(result.json)
})

/**
 * @desc    Register a new role
 * @route   POST /api/roles
 * @access  Public
*/
const registerRole = expressAsyncHandler(async (req, res) => {
  const timestamp = new Date().getTime()
  const role: Role = req.body
  const roleExists = (await getAll('role_name', partitionKeyPrefix)).json
  console.log(roleExists);
  
  if (roleExists.includes(role.role_name)) {
    return res.status(400).json({error: `この${role.role_name}権限はすでに登録されました`})
  }
  const Item = {
    pk: `${uuid.v4()}-${partitionKeyPrefix}`,
    permissions: role.permissions,
    role_name: role.role_name,
    price: role.price,
    image: role.image,
    createdAt: timestamp,
    updatedAt: timestamp
  }
  const result = await postSingle(Item)
  return res.status(result.status).json(result.json)
})

/**
 * @desc    Get role by ID
 * @route   GET /api/roles/:id
 * @access  all
*/
const getRoleById = expressAsyncHandler(async (req, res) => {
  const result = await getSingle(req.params.id)
  delete result.json.password
  return res.status(result.status).json(result.json)
})
/**
 * @desc    Update role profile
 * @route   PUT /api/roles/profile
 * @access  Private
 */
const updateRole = expressAsyncHandler(async (req, res) => {
  const id  = req.params.id
  const role: Role = req.body
  const keyValArr = [
    {key: 'permissions', val: role.permissions} ,
    {key: 'role_name', val: role.role_name} ,
    {key: 'price', val: role.price} ,
    {key: 'image', val: role.image} ,
  ]
  const result = await putSingle(id, keyValArr)
  return res.status(result.status).json(result.json)
  
})

/**
 * @desc    Delete role
 * @route   DELETE /api/roles/:id
 * @access  Private/Admin
*/ 
const deleteRole = expressAsyncHandler(async (req, res) => {
  const id  = req.params.id
  const result = await deleteSingle(id)
  return res.status(result.status).json(result.json)
})

export {
  getRoles,
  registerRole,
  getRoleById,
  updateRole,
  deleteRole,
}
