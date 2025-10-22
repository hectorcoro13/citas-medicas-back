import {DataSource, Repository} from "typeorm"
import { DB_DROP, DB_ENTITES, DB_LOGGING, DB_SYNC  } from "./env";
import { User } from "../entities/User.entity"
import { Credential } from "../entities/Credentials.entity"


export const AppDataSource = new DataSource({
    type: "postgres",
    

    url: process.env.DB_URL,
    synchronize: DB_SYNC,
    logging: DB_LOGGING,
    entities: DB_ENTITES,
    dropSchema: DB_DROP,
    
    ssl: {
      rejectUnauthorized: false,
    },

})


 export const Usermodel: Repository<User> = AppDataSource.getRepository(User)
 export const CredentialModel: Repository<Credential> = AppDataSource.getRepository(Credential)