
import { PermissionType } from '@lib'
import express from 'express'
const userRoutes = express.Router()
import {
  authUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getAllUserInfo,
  registerUser,
  getUserLatest,
} from '../controllers/userController'
import { protect, onlyPermit } from '../middleware/authMiddleware'

/**
 * @permissions ONLY ALLOW admin like permission
 */
const permissions: PermissionType[] = [PermissionType.CAN_EDIT_USER, PermissionType.ALL]

userRoutes.route('/')
  .post(registerUser)
  .get(protect, onlyPermit(permissions), getUsers)

userRoutes.route('/all').get(protect, onlyPermit(permissions), getAllUserInfo)

userRoutes.post('/login', authUser)

/**
 * @desc after user login this will be the request to take all the data that can be shown to user and stuff
 * @exception non login user
 */
userRoutes.route('/latest').get(protect, getUserLatest)

/**
 * @desc MAKE SURE THIS IS LAST BECAUSE /:id WILL GET EVERYTHING
 * @exception only delete has admin like permission get and put is allowed if user are login
 */
userRoutes
  .route('/:id')
  .get(protect, onlyPermit([...permissions, PermissionType.CAN_EDIT_PROFILE,]), getUserById)
  .put(protect, onlyPermit([...permissions, PermissionType.CAN_EDIT_PROFILE,]), updateUser)
  .delete(protect, onlyPermit(permissions), deleteUser)

export default userRoutes
