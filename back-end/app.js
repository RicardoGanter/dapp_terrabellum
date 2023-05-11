import db from "./database/db.js";
import cors from 'cors';
import express from "express";
import UsuarioRoutes from './routes/routes.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/usuarios', UsuarioRoutes)


try {
    await db.authenticate()
    console.log('DB: conexion exitosa.')
} catch (error) {
    console.log(`el error es:${error}`)
};


//  app.get("/",(req,res)=>{
//      res.send("Hola :)")
//  });

app.set('port',process.env.PORT || 7000);

app.listen(app.get('port'),()=>{
    console.log(`conectado en el puerto`)
})