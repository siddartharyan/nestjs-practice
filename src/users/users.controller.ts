import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Session} from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
    constructor(private service:UsersService,private authService:AuthService){

    }

    @Get("/colors/:color")
    createColor(@Param() color:string,@Session() session:any){
        session.color=color
    }

    @Get("/get/color")
    getColor(@Session() session:any){
        return session.color
    }
    @Post("/signup")
    createUser(@Body() details:CreateUserDto){
        return this.authService.signUp(details.email,details.password)
    }

    @Post("/signin")
    @HttpCode(200)
    validUser(@Body() details:CreateUserDto){
        return this.authService.signIn(details.email,details.password)
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
