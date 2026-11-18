import { ROLE_PERMISSIONS } from "../config/permissions";

export function hasPermission(role, permission) {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function hasAnyPermission(role, requiredPermissions) {
  return requiredPermissions.some((permission) =>
    hasPermission(role, permission)
  );
}

export function hasAllPermissions(role, requiredPermissions) {
  return requiredPermissions.every((permission) =>
    hasPermission(role, permission)
  );
}
