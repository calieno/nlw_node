import console from "console";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayLoad {
    sub: string
}

export function ensureAuthenticad(request: Request, response: Response, next: NextFunction){

    //recebe o token
    const authToken = request.headers.authorization
    
    //validar se token esta preenchido
    if (!authToken){
        return response.status(401).end()
    }
    
    //validar se token é válido
    const [,token] = authToken.split(" ")
    
    try{
        const { sub } = verify(token, "d777dd84cb155f65cf34787b1040a9f0") as IPayLoad 

        //recuperar info do usuário
        request.user_id = sub

    }catch (err) {
        return response.status(401).end()
    }
    
return next()
}