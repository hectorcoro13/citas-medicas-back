import { AppoinmentRegisterDTO } from "../dtos/appointmentDTO";
import { Appointment } from "../entities/Appointment.entity";
import {  status } from "../interfaces/AppointmentIterfaces";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { getUserByIdService } from "./userServices";


export const registerAppointmentServices = async(appointment: AppoinmentRegisterDTO):Promise<Appointment> =>{

    await getUserByIdService(appointment.userId.toString())

    AppointmentRepository.ValidateAllowAppointment(appointment.date,appointment.time)
   await AppointmentRepository.validateExistingAppoint(appointment.userId,appointment.date,appointment.time)

   const newAppointment = AppointmentRepository.create({
    date: appointment.date,
    time : appointment.time,
    user: {id: appointment.userId}
   })

   return await AppointmentRepository.save(newAppointment)

}

export const getAppointmentServices = async() :Promise<Appointment []> =>{
   const appointments =  await AppointmentRepository.find()
   if(appointments.length>0) return appointments
   throw new Error(`No se encontraron citas`)
}

export const getAppointmentByIdService = async(id:string):Promise< Appointment> =>{

  const appointmentFound = await AppointmentRepository.findOne({
    where:{
      id: parseInt(id,10)
    }
  })
  if(!appointmentFound) throw new Error(`La cita con id${id} no fue encontrada`);
  else return appointmentFound
  
}

export const cancelStatusAppointmentService = async (id:string):Promise< Appointment> =>{
  const appointmentFound = await AppointmentRepository.findOne({
    where:{
      id: parseInt(id,10)
    }
  })
  if(!appointmentFound) throw new Error(`La cita con id${id} no fue encontrada`);
  appointmentFound.status = status.Cancelled
  return await AppointmentRepository.save(appointmentFound)
}