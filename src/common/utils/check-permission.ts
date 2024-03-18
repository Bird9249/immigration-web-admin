import { AuthResponseType } from "../../contexts/authentication/get-auth.api";
import { Permission, PermissionGroup } from "../enum/permission.enum";

export default (
  permission: Permission,
  group: PermissionGroup,
  auth: AuthResponseType
): boolean => {
  if (auth.roles.includes("dev") || auth.roles.includes("admin")) {
    return true;
  }

  return auth.permissions.includes(`${group}:${permission}`);
};
