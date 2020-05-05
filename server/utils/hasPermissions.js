function hasPermissions(user, permissionsNeeded = []) {
  const matchedPermissions = user.permissions.some(
    (userPermission) => {
      return permissionsNeeded.includes(userPermission);
    },
  );

  if (!matchedPermissions) {
    throw new Error('You do not have sufficient permissions');
  }
}

module.exports = hasPermissions;
