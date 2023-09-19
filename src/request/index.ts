import { http } from './request';
import './untils';
// 验证码
export const queryCode = () => {
  return http({
    url: '/sysUser/image',
    method: 'post',
    responseType: 'arraybuffer',
  });
};
// 登录
export const queryLogin = (data: login) => {
  return http({
    url: '/user/login',
    method: 'post',
    data,
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  });
};
// 左边权限菜单
export const queryMenuList = (data:Object) => {
  return http({
    url: '/sysUser/getMenuList',
    method: 'get',
    data,
  });
};
// department列表
export const queryDepartmentList = (data:any) => {
  return http({
    url: '/department/list',
    method: 'get',
    data,
  });
};
// department添加
export const queryDepartmentListAdd = (data:any) => {
  return http({
    url: '/department',
    method: 'post',
    data
  });
};
// department删除
export const queryDepartmentListDelete = (data:any) => {
  return http({
    url: `/department/${data.id}`,
    method: 'DELETE',
  });
};
// department编辑
export const queryDepartmentListEdit = (data:any) => {
  return http({
    url: `/department`,
    method: 'put',
    data
  });
};
// 树状接口
export const queryParent = (data:any) => {
  return http({
    url: '/department/parent',
    method: 'get',
    data,
  });
};
// 用户列表数据
export const queryUser = (data:any) => {
  return http({
    url: '/user/list',
    method: 'get',
    data,
  });
};
// 用户列表添加
export const queryUserAdd = (data: any) => {

  return http({
    url: '/user',
    method: 'post',
    data,
  });
};

// 用户列表删除
export const queryUserDelete = (data: any) => {
  return http({
    url: `/user/${data.id}`,
    method: 'delete',
  });
};
// 用户列表编辑
export const queryUserEdit = (data: any) => {
  return http({
    url: '/user',
    method: 'put',
    data,
  });
};

// 权限管理数据
export const queryMenulist = (data: any) => {
  return http({
    url: '/menu/list',
    method: 'get',
    data,
  });
};

// 权限管理添加
export const queryMenulistAdd = (data: any) => {
  return http({
    url: '/menu',
    method: 'post',
    data,
  });
};

// 权限管理删除
export const queryMenulistDelete = (data: any) => {
  return http({
    url: `/menu/${data.id}`,
    method: 'delete',
  });
};

// 权限管理编辑
export const queryMenuListEdit = (data: any) => {
  return http({
    url: '/menu',
    method: 'put',
    data,
  });
};

// 权限管理树状接口
export const queryMenuParent = (data: any) => {
  return http({
    url: '/menu/parent',
    method: 'get',
    data,
  });
};

// 角色列表数据
export const queryRoles = (data: any) => {
  return http({
    url: '/role/list',
    method: 'get',
    data,
  });
};
// 角色树状数据
export const queryRolesTree = (data: any) => {
  return http({
    url: '/role/getAssignPermissionTree',
    method: 'get',
    data,
  });
};

// 角色添加数据
export const queryRolesAdd = (data: any) => {
  return http({
    url: '/role',
    method: 'post',
    data,
  });
};

// 角色删除数据
export const queryRolesDelete = (data: any) => {
  return http({
    url: `/role/${data.id}`,
    method: 'delete',
  });
};

// 角色编辑数据
export const queryRolesEdit = (data: any) => {
  return http({
    url: '/role',
    method: 'put',
    data,
  });
};
//角色权限分配
export const queryRoleSave = (data: any) => {
  return http({
    url: '/role/roleAssignSave',
    method: 'post',
    data,
  });
};
// 用户权限分配
export const queryUserTree = (data: any) => {
  return http({
    url: '/user/getRolistForAssign',
    method: 'get',
    data
  });
};

export const queryGetinfo = (data?: any) => {
  return http({
    url: '/sysUser/getInfo',
    method: 'get',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
