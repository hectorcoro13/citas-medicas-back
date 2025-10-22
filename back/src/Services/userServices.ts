import { AppDataSource, Usermodel } from "../config/data.source";
import { userDto, UserLoginDTO, userLoginSuccesDTO, UserRegisterDTO } from "../dtos/userDto";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { checkCredential, createCredentialServices } from "./credenciaServices";


export const getUserService = async(): Promise<userDto[]> =>{
const users :User[] = await Usermodel.find()
return users
}

export const getUserByIdService = async(id :string) :Promise<userDto> =>{

const userFound = await Usermodel.findOne({
    where: {id :parseInt(id,10)},
    relations: ["appointments"]
})
if(!userFound) throw new Error (`El usuario con id ${id} no existe`)
    else return userFound
}

export const registerUserService =  async ( user: UserRegisterDTO) : Promise<User> => {


const result = await AppDataSource.transaction(async(entityManager) => {
const userCredentials:Credential = await createCredentialServices (entityManager,user.username, user.password)
const newUser:User = entityManager.create(User,{
    name: user.name,
    birthdate: user.birthdate,
    email:user.email,
    nDni: user.nDni,
    credentials: userCredentials
})
return await entityManager.save(newUser)
})
return result
}

export const loginUserService = async (user:UserLoginDTO): Promise<userLoginSuccesDTO> =>{
    const credentialId:number | undefined = await checkCredential(user.username,user.password)
     const userFound: User| null = await Usermodel.findOne({
        where:{
            credentials:{
                id:credentialId
            }
        }
    })
    return{
        loggin: true,
        user:{
            id: userFound?.id ?? 0,
            name:userFound?.name ??"",
            email: userFound?.email ??"",
            birthdate:userFound?.birthdate ?? new Date(),
            nDni: userFound?.nDni ?? 0

        }
    }

}