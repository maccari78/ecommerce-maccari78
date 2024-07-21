import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { Roles } from '../common/user-roles.enum';

@Injectable()
export class RemoveNullAndRolesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const userRoles = request.currentUser?.roles;

    return next.handle().pipe(
      map(data => this.handleRoles(data, userRoles)),
    );
  }

  private handleRoles(data: any, userRoles: string[]): any {
    if (Array.isArray(data)) {
      return data.map(item => this.handleRoles(item, userRoles));
    } else if (typeof data === 'object' && data !== null) {
      const newData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          if (key === 'roles' && (!userRoles || !userRoles.includes(Roles.SUPERADMIN))) {
            continue;
          }
          if (value instanceof Date) {
            newData[key] = value.toISOString();
          } else if (value !== null) {
            newData[key] = this.handleRoles(value, userRoles);
          } else {
            newData[key] = value;
          }
        }
      }
      return newData;
    } else {
      return data;
    }
  }
}


