export interface PermissionDto {
  user: string;
  type: 'admin' | 'read' | 'write';
  status: boolean;
  business: string;
}
