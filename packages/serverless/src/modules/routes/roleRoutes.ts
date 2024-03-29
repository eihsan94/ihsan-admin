
import { PermissionType } from '@lib'
import express from 'express'
const roleRoutes = express.Router()
import {
  getRoles,
  getRoleById,
  deleteRole,
  updateRole,
  registerRole,
} from '../controllers/roleController'
import { 
  protect, 
  onlyPermit 
} from '../middleware/authMiddleware'

/**
 * @permissions ONLY ALLOW admin like permission
 */
const permissions: PermissionType[] = [PermissionType.CAN_EDIT_ROLE, PermissionType.ALL]

/**
 * @desc MAKE SURE THIS IS LAST BECAUSE /:id WILL GET EVERYTHING
 */
roleRoutes.route('/')
  .post(protect, onlyPermit(permissions),registerRole)
  .get(protect, onlyPermit(permissions), getRoles)
 
/**
 * @desc MAKE SURE THIS IS LAST BECAUSE /:id WILL GET EVERYTHING
 */
roleRoutes
  .route('/:id')
    .get(protect, onlyPermit(permissions), getRoleById)
    .put(protect, onlyPermit(permissions), updateRole)
    .delete(protect, onlyPermit(permissions), deleteRole)

export default roleRoutes