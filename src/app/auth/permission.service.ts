import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ISubjectPermissions, IAction } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private authService: AuthService) {}
  getPermissionsForSubject(subject: string): ISubjectPermissions {
    const perms = this.authService.permissions || {};
    const getPermissionForAction = (perms: IAction[], action: string) => {
      const perm = perms.find((perm) => perm.action === action);
      return {
        exists: perm !== undefined,
        hasCondition: perm?.condition !== null,
      };
    };

    const subjectPermission: ISubjectPermissions = {
      delete: false,
      create: false,
      read: false,
      update: false,
      updateStatus: false,
      deleteCondition: false,
      createCondition: false,
      readCondition: false,
      updateCondition: false,
      updateStatusCondition: false,
      userId: this.authService.userId?? -5
    };

    if (perms['all']) {
      const { exists: deleteExists, hasCondition: deleteHasCondition } =
        getPermissionForAction(perms['all'], 'delete');
      const { exists: createExists, hasCondition: createHasCondition } =
        getPermissionForAction(perms['all'], 'create');
      const { exists: updateExists, hasCondition: updateHasCondition } =
        getPermissionForAction(perms['all'], 'update');
      const {
        exists: updateStatusExists,
        hasCondition: updateStatusHasCondition,
      } = getPermissionForAction(perms['all'], 'updateStatus');
      const { exists: readExists, hasCondition: readHasCondition } =
        getPermissionForAction(perms['all'], 'read');

      subjectPermission.delete = deleteExists;
      subjectPermission.create = createExists;
      subjectPermission.update = updateExists;
      subjectPermission.updateStatus = updateStatusExists;
      subjectPermission.read = readExists;
      subjectPermission.deleteCondition = deleteHasCondition;
      subjectPermission.createCondition = createHasCondition;
      subjectPermission.updateCondition = updateHasCondition;
      subjectPermission.updateStatusCondition = updateStatusHasCondition;
      subjectPermission.readCondition = readHasCondition;
    }

    if (perms[subject]) {
      const { exists: deleteExists, hasCondition: deleteHasCondition } =
        getPermissionForAction(perms[subject], 'delete');
      const { exists: createExists, hasCondition: createHasCondition } =
        getPermissionForAction(perms[subject], 'create');
      const { exists: updateExists, hasCondition: updateHasCondition } =
        getPermissionForAction(perms[subject], 'update');
      const {
        exists: updateStatusExists,
        hasCondition: updateStatusHasCondition,
      } = getPermissionForAction(perms[subject], 'updateStatus');
      const { exists: readExists, hasCondition: readHasCondition } =
        getPermissionForAction(perms[subject], 'read');

      subjectPermission.delete = deleteExists || subjectPermission.delete;
      subjectPermission.create = createExists || subjectPermission.create;
      subjectPermission.update = updateExists || subjectPermission.update;
      subjectPermission.updateStatus =
        updateStatusExists || subjectPermission.updateStatus;
      subjectPermission.read = readExists || subjectPermission.read;
      subjectPermission.deleteCondition =
        deleteHasCondition || subjectPermission.deleteCondition;
      subjectPermission.createCondition =
        createHasCondition || subjectPermission.createCondition;
      subjectPermission.updateCondition =
        updateHasCondition || subjectPermission.updateCondition;
      subjectPermission.updateStatusCondition =
        updateStatusHasCondition || subjectPermission.updateStatusCondition;
      subjectPermission.readCondition =
        readHasCondition || subjectPermission.readCondition;
    }

    return subjectPermission;
  }
}
