//hacer el import de express antiguamente
//const express = require('express');

//se debe modificar el pkg.json para agregar type module para hacer
import Express from "express";
import { MongoClient } from "mongodb"; //gestor de la bd, con mongoose o prisma tambien se puede hacer

//conexion a la bd
const stringConexion = 'mongodb+srv://admin:admin@clusterxforce.aktsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// crear instancia de mongoclient
const client = new MongoClient(stringConexion, {
    useNewUrlParser: true, //siempre va segun la documentacion de mongodb
    useUnifiedTopology: true,
})

//varible global de conexion (hace referencia a la bd), esto luego se cambiara
let conexion;

const app = Express()//nombre app
app.use(Express.json())//para habilitar json en express, extraer la info util

//se necesita crear las rutas del servidor
//ruta tipo get= read del CRUD, tiene 2 parametro. Primero la ruta, segundo la funcion que se ejecuta cuando alguien hace una peticion a esa ruta (callback)
app.get('/usuarios', (req, res) => {
    console.log("se hizo get al servidor en la ruta /usuarios")
    /*
    const usuariosBackend = [
        {nombre: 'Juana', contraseña: '1234', rol: 'vendedor', celular: '3213213214'},
        {nombre: 'Sebastian', contraseña: '4567', rol: 'usuario', celular: '3143143146'},
        {nombre: 'Felipe', contraseña: '7894', rol: 'usuario', celular: '3693693695'},
        {nombre: 'Laura', contraseña: 'boba', rol: 'usuario', celular: '3693693695' }];*/
    
    //busque la coleccion usuario 
    conexion.collection('usuario')
        .find({}) //con x parametros de busqueda, filtros de busqueda
        .limit(50) //limitar a 50 resultados
        .toArray((err, result) => { //convertir array para entienda json
            if (err) {
                res.status(400).send("Error consultando los usuarios")
            }
            else {
                res.json(result); // la respuesta del get sera el result de la collection
            }
    })

    //respuesta del servidor, devuelve el json de usuarios, antes
    //res.send(usuariosBackend);
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

            //implentar codifo para crear usuario en la bd
            //se usan funciones especificas de mongo, en una "archivo" lalamaod usuario agregame los datosUsuario recibidos desde el front
            conexion.collection('usuario').insertOne(datosUsuario,
                (err, result) => { //func anonima de que hacer
                    if (err) { //si error
                        console.error(err)//para ver el error
                        res.sendStatus(500)
                    } else {
                        console.log(result) //
                        res.sendStatus(200)
                        //res.send("OK, usuario creado")
                }
            })
        } else {
            res.sendStatus(500)
        }
    } catch {
        res.sendStatus(500)
    }

})


//funcion main como en python que la ejecuta y return el listen
const main = () => {

    //este codigo siempre se copia, buscar en la documentacio
    client.connect((err, db) => { //retorna un error y una db
        if (err) {
            console.error('Error conectando a la base de datos')
        }
        //se le asigna un valor a la let conexion
        conexion = db.db('xforce')
        console.log("conexion exitosa")
        return (
            //decirle a la app que este escuchando los eventos, sirve para abrir el canal de comunicacion
            //se pone el  puerto 5000 para express por convencion deberia correr en 5000 o 5050
            app.listen(5000, () => {
                console.log("alguien escucha el puerto 5000")
            }
            )// los console.log se muiestran sobre la terminal de vscode porque esta corriendo en el servidor y NO en el navegador del cliente)
        )
    })    
}

main();//para ejecutar la funcion main