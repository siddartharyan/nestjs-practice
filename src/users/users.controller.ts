import { Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private service:UsersService){

    }
    @Post("/signup")
    createUser(@Body() details:CreateUserDto){
        return this.service.create(details)
    }
    @Serialize(UserDto)
    @Get("/:id")
    findOne(@Param("id") id:string){
        return this.service.findOne(parseInt(id))
    }

    @Get("")
    findAll(@Query("email") email:string){
        return this.service.find(email)
    }

    @Delete("/:id")
    deleteRecord(@Param("id") id:string){
        return this.service.remove(parseInt(id))
    }

    @Patch("/:id")
    updateRecord(@Param("id") id:string,@Body() details:UpdateUserDto){
        return this.service.update(parseInt(id),details)
    }
}
