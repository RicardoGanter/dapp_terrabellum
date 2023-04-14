import db from "./database/db.js";
import cors from 'cors';
import express from "express";
import UsuarioRoutes from './routes/routes.js'
// const express = require('express');
const app = express()
app.use(cors())
app.use(express.json())
// app.use('/blogs', blogRoutes)
app.use('/usuarios', UsuarioRoutes)
try {
    await db.authenticate()
    console.log('DB: conexion exitosa.')
} catch (error) {
    console.log(`el error es:${error}`)
};

 app.get("/",(req,res)=>{
    res.send("Hola :)")
});

// app.set('port',process.env.PORT || 7000);

// app.listen(app.get('port'),()=>{
//     console.log(`conectado en el puerto`)
// })

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Conectado en el puerto ${port}`);
});



app.post('/api/login', (req, res)=>{
    const {Nombre, Contraseña} = req.body
    const values = [Nombre, Contraseña] 
    let conecction = mysql.createConnection(db)
    conecction.query("select * from usuarios where nombre = ? and contraseña= ?", values, (error, result)=>{
        if(error){
            res.status(500).send(error)
        }else{

        if(result.length>0){
            res.status(200).send(result[0])
        }else{
            res.status(400).send("Usuario no existe")
        }
        }
    })
    conecction.end()
})
