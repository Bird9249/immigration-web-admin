export interface ConvertedPermission {
  label: string;
  value: string;
  description: string;
}

export interface GroupedPermission {
  group: string;
  items: ConvertedPermission[];
}

export interface PermissionResponse {
  id: number;
  name: string;
  description: string;
  group_name: string;
  created_at: string;
}
