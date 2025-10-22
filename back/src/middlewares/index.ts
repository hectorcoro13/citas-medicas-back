import { NextFunction, Request, Response } from "express";

export const validateUserRegisterData = (req : Request , res: Response,next: NextFunction): void =>{

    const campos :string[] = ["birthdate","email","nDni","name","password","username"]

    const camposFiltrados :string[]  = campos.filter(campo => !req.body[campo])
    if(camposFiltrados.length>0 ){
        res.status(400).json({
            message: `Falta informacion para crear el usuario : ${camposFiltrados.join(",")}`
        })
    
    } else next()
}

export const validadteAppointmentRegisterData =(req : Request , res: Response,next: NextFunction) : void =>{
    const campos :string[] = ["date","time","userId"]

    const camposFiltrados :string[]  = campos.filter(campo => !req.body[campo])
    if(camposFiltrados.length>0 ){
        res.status(400).json({
            message: `Falta informacion para crear la cita : ${camposFiltrados.join(",")}`
        })
    
    } else next()
}