import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// Make sure to import Request from express specifically
import { Request } from 'express';

interface UserPayload {
  userId: string;
  email: string;
  roles: string[];
}

// Extend the Express Request to include our user
interface RequestWithUser extends Request {
  user: UserPayload;
}

export const GetUser = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext): unknown => {
    // 1. Tell getRequest what to expect
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    const user = request.user;

    // 2. Return the data safely
    return data ? user?.[data] : user;
  },
);
