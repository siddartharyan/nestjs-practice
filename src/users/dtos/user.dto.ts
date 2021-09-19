import { Expose } from "class-transformer"

export class UserDto{

    @Expose()
    id:String
    @Expose()
    email:String
}