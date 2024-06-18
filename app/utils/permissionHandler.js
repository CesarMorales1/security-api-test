const permissionChecker = (permissions,permiseToFound) =>
{
    return permissions.some(item => item.permissionId === permiseToFound);
}

export {permissionChecker};
