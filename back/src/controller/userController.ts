import { Request, Response } from "express"
import { UserLoginDTO, userLoginSuccesDTO, UserRegisterDTO } from "../dtos/userDto"
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../Services/userServices"
import { PostgresError } from "../interfaces/ErrorInterface"

export const getUsersController = async(req : Request,res : Response): Promise<void> =>{
    try {
       const response = await getUserService()
       res.status(200).json({
        mesagge : "Obtener el listado de todos los usuarios",
        data : response
    })
    } catch (error) {
        res.status(400).json({
            mesagge : "Error en el servidor",
            data : error instanceof Error? error.message : 'Error desconocido'
    })
    }
}

export const getUserByIdController = async(req : Request < {id: "string"} >,res : Response): Promise<void> =>{
    const{id} = req.params
    try {
        const response = await getUserByIdService(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({
            mesagge : "Error en el servidor",
            data : error instanceof Error? error.message : 'Error desconocido'
    })
    }

    }
    export const registerUserController = async(req : Request < unknown,unknown,UserRegisterDTO >,res : Response): Promise<void>=>{
        try {
     await registerUserService(req.body)
        res.status(201).json({
            mesagge : "Usuario registrado con exito ",
        })
            
        } catch (error) {

            const postgresError = error as PostgresError
            
            res.status(400).json({
                mesagge : "Error en el servidor",
                data : postgresError instanceof Error? postgresError.detail? postgresError.detail : postgresError.message : "error desconocido"
        })

    }
    }

    export const loginUserController = async (req :Request< unknown,unknown, UserLoginDTO >, res: Response): Promise<void> => {
        try {
          const response: userLoginSuccesDTO | undefined =  await loginUserService(req.body)
          res.status(200).json(response)
        } catch (error) {
            res.status(400).json({
                mesagge : "Error en el servidor",
                data : error instanceof Error? error.message : 'Error desconocido'
        })
        
    }
}
