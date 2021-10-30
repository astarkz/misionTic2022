//hacer el import de express
//const express = require('express');


//se debe modificar el pkg.json para agregar type module
import Express from "express";

const app = Express()//nombre app
app.use(Express.json())//para habilitar json en express, extraer la info util

//se necesita crear las rutas del servidor
//ruta tipo get= read del CRUD, tiene 2 parametro. Primero la ruta, segundo la funcion que se ejecuta cuando alguien hace una peticion a esa ruta (callback)
app.get('/usuarios', (req, res) => {
    console.log("se hizo get al servidor en la ruta /usuarios")

    const usuariosBackend = [
        {nombre: 'Juana', contraseña: '1234', rol: 'vendedor', celular: '3213213214'},
        {nombre: 'Sebastian', contraseña: '4567', rol: 'usuario', celular: '3143143146'},
        {nombre: 'Felipe', contraseña: '7894', rol: 'usuario', celular: '3693693695'},
        {nombre: 'Laura', contraseña: 'boba', rol: 'usuario', celular: '3693693695' }];

    //respuesta del servidor, devuelve el json de usuarios
    res.send(usuariosBackend);
})

//ruta tipo post=create del crud
//las app tipo post no se pueden hacer desde el navegador, se usa postman o insomnia, sirven para probar solicitudes
app.post("/usuarios/nuevo", (req, res) => { //req =request, res = response
    //se instancia un obj datos usuario a la request
    const datosUsuario = req.body;
    //console.log("usuario a crear: ", datosUsuario)
    //obtener llaves del req
    console.log("usuario a crear: ", Object.keys(datosUsuario))
    //validacion de estados, codigos de respuesta servidor
    try {
        if (
            Object.keys(datosUsuario).includes('nombre') &&
            Object.keys(datosUsuario).includes('contrasena') &&
            Object.keys(datosUsuario).includes('rol') &&
            Object.keys(datosUsuario).includes('celular')
        ) {
            res.sendStatus(200)
            //res.send("OK, usuario creado")
        } else {
            res.sendStatus(500)
        }
    } catch {
        res.sendStatus(500)
    }

})

//decirle a la app que este escuchando los eventos, sirve para abrir el canal de comunicacion
//se pone el  puerto 5000 para express por convencion deberia correr en 5000 o 5050
app.listen(5000, () => { 
    console.log("alguien escucha el puerto 5000")
}
)// los console.log se muiestran sobre la terminal de vscode porque esta corriendo en el servidor y NO en el navegador del cliente