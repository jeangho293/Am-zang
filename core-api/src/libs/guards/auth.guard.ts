import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { UsersRepository } from '../../services/users/infrastructure/users.repository';
import { ModuleRef, Reflector } from '@nestjs/core';
import { FilteredUserSpec } from '../../services/users/domain/specs';
import { AsyncContext, AsyncContextKey } from '../async-context';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  private usersRepository: UsersRepository | null;

  constructor(
    private readonly reflect: Reflector,
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
    private readonly context: AsyncContext
  ) {}

  async canActivate(context: ExecutionContext) {
    if (this.isPublicRequest(context)) {
      return true;
    }

    if (!this.usersRepository) {
      this.usersRepository = this.moduleRef.get<UsersRepository>(UsersRepository, {
        strict: false,
      });
    }
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    const { userId } = await this.jwtService.verifyAsync<{ userId: string }>(token);

    const [user] = await this.usersRepository.satisfyElementFrom(
      new FilteredUserSpec({ id: userId })
    );

    if (!user) {
      throw new UnauthorizedException(`No User.`, { cause: 'No User.' });
    }

    this.context.set(AsyncContextKey.USER, user);
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }
    return token;
  }

  private isPublicRequest(context: ExecutionContext) {
    return this.reflect.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
  }
}
