import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context:ExecutionContext,handler:CallHandler):Observable<any>{
        //run something before a request is handled by request handler
        //run something before response is sent
        return handler
        .handle()
        .pipe(map(data =>plainToClass(this.dto,data,{
            excludeExtraneousValues:true
        })));

    }
}