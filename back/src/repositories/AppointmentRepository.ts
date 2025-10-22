
import { AppDataSource } from "../config/data.source";
import { Appointment } from "../entities/Appointment.entity";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

ValidateAllowAppointment:function(date:Date,time:string):void{

    const [hours,minutes] = time.split(":").map(Number)
    const appointmentDate = new Date(date)
    appointmentDate.setHours(hours,minutes,0)
    const appointmentDateCol = new Date(appointmentDate.getTime()-5*60*60*1000)
    const dateNowCol = new Date (new Date().getTime()-5*60*60*1000)

    if(appointmentDateCol<dateNowCol){
        throw new Error ("No se pueden agendar citas correspondientes a fechas pasadas")
    }

    const diffMilliSeconds = new Date().getTime()- appointmentDate.getTime()
    const diffInHours = diffMilliSeconds / (1000*60*60)
    if(diffInHours>24){
        throw new Error ("No se pueden agendar citas con menos de 24 horas de anticipacion")

    }
    const dayOfWeek = appointmentDateCol.getUTCDay()
    if(dayOfWeek===5||dayOfWeek===6){
        throw new Error ("No se pueden agendar citas en los fines de semana")
    }

    if(hours<8||hours>18){
        throw new Error ("No se pueden agendar citas fuera del horario establecido")
    }

},

validateExistingAppoint: async function (userId: number,date:Date, time:string):Promise<void>{
    const appointmentFound = await this.findOne({
        where:{
            user:{
                id:userId
            },
            date: date,
            time: time
        }
    })
    if(appointmentFound) throw new Error(`La cita con fecha: ${date},y hora ${time}, para el usario con id: ${userId} ,ya existe`)
}
})
