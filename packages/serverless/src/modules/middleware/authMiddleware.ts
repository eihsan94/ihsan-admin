import { PermissionType } from '@libTypes/enums'
import { Role, User } from '@libTypes/types'
import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import { getAll } from '../utils/crudUtil'
import jwt from 'jsonwebtoken'

export interface IGetUserAuthInfoRequest extends Request {
  user: User // or any other type
}
// import User from '../models/userModel.js'
// import Role from '../models/roleModel.js'
// import Shop from '../models/shopModel.js'

// middleware for authentication
const protect = asyncHandler(async (req: IGetUserAuthInfoRequest, res, next) => {
  let token
  const authorization = `${req.headers.authorization}`
  if (
    authorization && authorization.startsWith('Bearer')
  ) {
    try {
      token = authorization.split(' ')[1]
      console.log('your session token🔒', token);
      const decoded = jwt.decode(token) as User
      console.log(decoded);
      const result = await getAll('email', decoded.email, '-user')
      const user = result.json[0]
      // IF USER NOT FOUND
      if (!user) {
        console.log('the provided token does not have user inside');
        return res.status(401).json({error:'認証に失敗しました、ログインをもう一度行ってください😭'})

      }
      delete user.password
      console.log('current user 🙋🏽', user);
      req.user =  user
      next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({error:'認証に失敗しました、ログインをもう一度行ってください😭'})
    }
  }

  if (!token) {
    return res.status(401).json({error:'認証に失敗しました、ログインをもう一度行ってください😭'})
  }
})


// middleware for doing role-based permissions
const onlyPermit = (permissionTypes: PermissionType[]) => {
  // return a middleware
  return asyncHandler(async (req: IGetUserAuthInfoRequest, res, next) => {
    const { user } = req
    const roles = (await getAll('pk', 'roles')).json
    const currentRole: Role = roles.find((r:Role) => r.pk === user.role_pk)
    if (currentRole) {
      const isPermitted = permissionTypes.some(p => currentRole.permissions.includes(p))
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