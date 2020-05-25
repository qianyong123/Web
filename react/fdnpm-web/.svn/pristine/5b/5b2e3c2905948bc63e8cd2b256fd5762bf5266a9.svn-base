// import React from 'react'
import RenderAuthorize from '@/components/Authorized'
import { getAuthority } from './authority'

let Authorized = RenderAuthorize(getAuthority()) // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority())
}

// // 权限处理
// const ApplyAuthorized = ({ children, authority, noMatch = null }) => {
//   const DynamicAuthorized = RenderAuthorize(authority || 'user')
//   const havePermission = currentAuthority => {
//     console.log('currentAuthority', currentAuthority)
//     return ['user', 'admin'].indexOf(authority) !== -1
//   }
//   return (
//     <DynamicAuthorized authority={havePermission} noMatch={noMatch}>
//       {children}
//     </DynamicAuthorized>
//   )
// }

export { reloadAuthorized }
export default Authorized
