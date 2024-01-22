export interface UserModel {
  id: number;
  username: string;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
  image?: string;
  isActive:boolean;
  created: string;
  update: string;
}