import { Request,Response } from "express"
import { AppoinmentRegisterDTO } from "../dtos/appointmentDTO"
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppointmentServices, registerAppointmentServices } from "../Services/appointmentServices"
import { PostgresError } from "../interfaces/ErrorInterface"

export const getAppointmentsController = async (req : Request , res: Response): Promise< void>=>  {
    try {
        const response = await getAppointmentServices()
        res.status(200).json({
            mesagge : "Obtener el listado de todos los turnos de todos los usuarios",
            data : response
    })
    } catch (error) {
        res.status(404).json({
            mesagge : "No se encontraron turnos",
            data : error instanceof Error? error.message : 'Error desconocido'
    })    
    }
}

export const getAppointmentsByIdController = async(req : Request  <{id: string} > , res: Response):Promise< void>=>  {
    const {id} = req.params
    try {
        const response = await getAppointmentByIdService(id)
        res.status(200).json({
            mesagge : "Obtener el detalle de un turno especifico"+ id,
            data : response
    })
    } catch (error) {
        res.status(404).json({
            mesagge : "Error en el servidor",
            data : error instanceof Error? error.message : 'Error desconocido'
    })    
    }
   
}

export const registerAppointmentController = async (req : Request < unknown, unknown, AppoinmentRegisterDTO> , res: Response): Promise<void>=>  {
    try {
       const response = await registerAppointmentServices(req.body)
       res.status(201).json({
        mesagge : "Cita agendada con exito",
        data : response
})
    } catch (error) {
        const err = error as PostgresError
        res.status(400).json({
            mesagge : "Error en el servidor",
            data : err instanceof Error? err.detail? err.detail :  err.message : 'Error desconocido'
    })    
    }
   
}

export const cancelStatusAppointmentController = async (req : Request <{id: string}> , res: Response): Promise<void>=>  {
    const {id} = req.params

    try {
        const response =  await cancelStatusAppointmentService(id)
        res.status(200).json({
            mesagge : 'Cambia el estatus del turno a "cancelled" : ' + id,
            data : response
    })

    } catch (error) {
        res.status(404).json({
            mesagge : "Error en el servidor",
            data : error instanceof Error? error.message : 'Error desconocido'
    })    
    }
}

