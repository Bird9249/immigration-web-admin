import {
  ConvertedPermission,
  GroupedPermission,
  PermissionResponse,
} from "../api/permission.interface";

export default function convertPermissions(
  originalPermissions: PermissionResponse[]
): GroupedPermission[] {
  const convertedGroups: GroupedPermission[] = [];

  originalPermissions.forEach((item) => {
    const groupIndex = convertedGroups.findIndex(
      (group) => group.group === item.group_name
    );

    if (groupIndex === -1) {
      const newItem: GroupedPermission = {
        group: item.group_name,
        items: [
          {
            label: `${item.name}`,
            value: String(item.id),
            description: item.description,
          },
        ],
      };
      convertedGroups.push(newItem);
    } else {
      const convertedItem: ConvertedPermission = {
        label: `${item.name}`,
        value: String(item.id),
        description: item.description,
      };
      convertedGroups[groupIndex].items.push(convertedItem);
    }
  });

  return convertedGroups;
}
