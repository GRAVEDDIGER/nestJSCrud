import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  private authService :AuthService
  constructor(authService: AuthService) {
    super();
    this.authService=authService
  }
  createHash = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<Prisma.UserCreateInput, 'hash'>> {
    const user = await this.authService.validateUser(
      username,
      this.createHash(password),
    );
    if ('error' in user) throw new UnauthorizedException(user);
    return user;
  }
}

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  private usersService: UsersService;
  constructor(usersService: UsersService) {
    super({ passReqToCallback: true });
    this.usersService = usersService
  }
  createHash = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<Omit<Prisma.UserCreateInput, 'hash'>> {
    const user= this.usersService.localFindByUserName(username)
    if ("error" in  user) {
    let newUser=new CreateUserDto()
      Object.keys(newUser).forEach((field:keyof CreateUserDto)=>{
        if (field in req.body) newUser[field] =req.body[field]
    })
    let response:{response?:CreateUserDto,ok:boolean,error?:any}
    try{
      response =await this.usersService.create(newUser)
    }catch(error){console.log(error)}
    
    if (response.ok) {
      const {hash,...userWithoutHash} = newUser
      return userWithoutHash
    }
  }
  else throw new BadRequestException(`User ${username} already exists`)

  }
}
