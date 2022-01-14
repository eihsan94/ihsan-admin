
import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import { getAll, getAllUser, putSingleUser } from '../utils/crudUtil'
import { PermissionType, Role, User } from '@lib'

export interface IGetUserAuthInfoRequest extends Request {
  user: User // or any other type
}
// import User from '../models/userModel.js'
// import Role from '../models/roleModel.js'
// import Shop from '../models/shopModel.js'

// middleware for authentication
const protect = asyncHandler(async (req: IGetUserAuthInfoRequest, res, next) => {
  const {current_user_email} = req.headers
  try {
    const currentUser = (await getAllUser('USER')).json.filter((u:User) => u.email === current_user_email)[0]
    const currentUserId = currentUser.id
    const isLogin = (await getAllUser('SESSION')).json.filter((s:any) => s.userId === currentUserId).length > 0
    if (isLogin) {
      if (!currentUser.role_pk) { // if the user has no role update the user with role
        currentUser.role_pk = (await getAll('pk', 'roles')).json.filter((r: Role) => r.role_name === 'USER')[0].pk
        const result = await putSingleUser(currentUser.pk, currentUser.sk, [{key: 'role_pk', val: currentUser.role_pk}])
        console.log(result);
      }
      req.user = currentUser
      next()
    } else {
      console.log(`the email provided: ${current_user_email} does not have user user session. It is not login`);
      return res.status(401).json({error:`Failed to authenticate for ${current_user_email}. Please Login again😭`})
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({error:`This error is given while authenticating login session for ${current_user_email}: ${error}😭`})
  }
})


// middleware for doing role-based role_permissions
const onlyPermit = (permissionTypes: PermissionType[]) => {
  // return a middleware
  return asyncHandler(async (req: IGetUserAuthInfoRequest, res, next) => {
    const { user } = req
    const roles = (await getAll('pk', 'roles')).json
    const currentRole: Role = roles.find((r:Role) => r.pk === user.role_pk)
    if (currentRole) {
      const isPermitted = permissionTypes.some(p => currentRole.role_permissions.includes(p))
      if (isPermitted) {
        console.log(`PERMISSION GRANTED, welcome ${currentRole.role_name} ${user.email}`);
        
        next(); // role is allowed, so continue on the next middleware
      } else {
        return res.status(401).json({error:`You are not authorized. Only user with ${permissionTypes} role is permitted`})
      }
    } else {
      return res.status(401).json({error:`You are not authorized. Only user with ${permissionTypes} role is permitted`})
    }
  })
}


export { 
  protect, 
  onlyPermit,
}
// add onlyPermit in product routes and check wether it works or not