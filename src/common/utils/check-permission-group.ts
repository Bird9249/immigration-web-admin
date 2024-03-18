import { AuthResponseType } from "../../contexts/authentication/get-auth.api";
import { PermissionGroup } from "../enum/permission.enum";

export default (group: PermissionGroup, auth: AuthResponseType): boolean => {
  if (auth.roles.includes("dev") || auth.roles.includes("admin")) {
    return true;
  }

  return extractGroup(auth.permissions).includes(group);
};

function extractGroup(permissions: string[]): string[] {
  const GroupSet: Set<string> = new Set();
  permissions.forEach((permission) => {
    const group = permission.split(":")[0];
    GroupSet.add(group);
  });
  return Array.from(GroupSet);
}
