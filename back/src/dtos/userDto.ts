export interface UserRegisterDTO{
    name :string, 
    email: string,
    birthdate: Date,
    nDni: number,
    username: string, 
    password: string
}

export interface UserLoginDTO{ 
    username: string, 
    password: string
}

export interface userDto{
    id: number,
    name :string, 
    email: string
    birthdate: Date,
    nDni: number
}

export interface userLoginSuccesDTO{
    loggin: boolean,
        user: userDto
        }
