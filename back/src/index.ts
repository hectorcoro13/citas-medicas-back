import { AppDataSource } from "./config/data.source";
import { PORT } from "./config/env";
import server from "./server";

import "reflect-metadata"

AppDataSource.initialize()
.then(()=>{
    console.log("Database connection successful");
    
    server.listen(PORT,() => {
        console.log(`server listen on port: ${PORT}`);    
    })
})
.catch ((err) =>{
    console.log(err);
})


