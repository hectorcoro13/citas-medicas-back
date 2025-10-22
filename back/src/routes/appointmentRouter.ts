import { NextFunction, Request, Response, Router } from "express"
import { AppoinmentRegisterDTO } from "../dtos/appointmentDTO"
import { cancelStatusAppointmentController, getAppointmentsByIdController, getAppointmentsController, registerAppointmentController } from "../controller/appoinmentController"
import { validadteAppointmentRegisterData } from "../middlewares"

const appointmentRouter: Router = Router ()

appointmentRouter.get("/", (req : Request , res: Response) => getAppointmentsController(req , res))

appointmentRouter.get("/:id", (req : Request <{id: string} > , res: Response) => getAppointmentsByIdController(req , res))

appointmentRouter.post("/schedule",
(req : Request  , res: Response , next : NextFunction) => validadteAppointmentRegisterData(req , res, next),
(req : Request < unknown, unknown, AppoinmentRegisterDTO> , res: Response) => registerAppointmentController(req , res))

appointmentRouter.put("/cancel/:id", (req : Request <{id: string}> , res: Response) => cancelStatusAppointmentController(req , res))


export default appointmentRouter
// rutas terminada 