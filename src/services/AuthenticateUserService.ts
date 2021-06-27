import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UserRepositories } from "../repositories/UserRepositories"
import { sign } from "jsonwebtoken"
interface IAuthenticateRequest{
    email: string,
    password: string
}
class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UserRepositories)
        const userExists = await userRepositories.findOne({
            email,
        })

        if (!userExists) {
            throw new Error("Email or Password incorrect")
        }

        const passwordMatch = await compare(password, userExists.password)
    
        if (!passwordMatch){
            throw new Error("Email or Password incorrect")
        }

        const token = sign({
            email: userExists.email
        }, "d777dd84cb155f65cf34787b1040a9f0", {
            subject: userExists.id,
            expiresIn: "1d"
        } )
        return token
    }
}

export { AuthenticateUserService }