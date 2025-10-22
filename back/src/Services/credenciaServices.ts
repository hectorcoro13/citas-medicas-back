
import { EntityManager } from "typeorm"
import { Credential } from "../entities/Credentials.entity"
import { CredentialModel } from "../config/data.source"

const crypPass = async (password:string): Promise <string> =>{
const encoder = new TextEncoder()
const data = encoder.encode(password)
const hash = await crypto.subtle.digest("SHA-256", data)

const hashArray = Array.from(new Uint8Array(hash))
const passwordCrypt = hashArray.map( b => b.toString(16).padStart(2, "0" )).join("")

return passwordCrypt

 }
 export const createCredentialServices :  (entityManager:EntityManager,a: string , b: string) => Promise<Credential> = async (entityManager:EntityManager,username :string, password :string): Promise<Credential> => {

const passwordEncripted : string = await crypPass(password)
const credentials : Credential = entityManager.create(Credential,{
    username,
    password : passwordEncripted
})
return await entityManager.save(credentials)
}

export const checkCredential = async (username :string, password:string): Promise<number | undefined> =>{
    const usernameFound: Credential | null = await CredentialModel.findOne({
    where:{
        username:username
    }
})
const crypPassword :string = await crypPass(password)
if(!usernameFound) throw new Error(`El usuario ${username} no fue encontrado`);
if( usernameFound.password !== crypPassword)  throw new Error(`Usuario o Contraseña incorrecta`);
else return usernameFound.id

}
