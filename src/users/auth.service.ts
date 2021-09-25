import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from './users.service';

const _scrypt=promisify(scrypt)
@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}

    async signUp(email:string,password:string){
        const users=await this.usersService.find(email)
        if(users.length){
            throw new BadRequestException("email already in use")
        }
        const salt=randomBytes(8).toString('hex')
        const hash=(await _scrypt(password,salt,32)) as Buffer
        const result=salt+'.'+hash.toString('hex')
        const dto=new CreateUserDto()
        dto.email=email
        dto.password=result
        const user=await this.usersService.create(dto)
        return user
    }

    async signIn(email:string,password:string){
        const [user]=await this.usersService.find(email)
        if(!user){
            throw new NotFoundException('user not found')
        }
        const [salt,storedHash]=user.password.split('.')
        const hash=(await _scrypt(password,salt,32)) as Buffer
        if(storedHash!==hash.toString('hex')){
            throw new BadRequestException('password is wrong')
        }
        return user
    }
}