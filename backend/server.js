//hacer el import de express antiguamente
//const express = require('express');

//se debe modificar el pkg.json para agregar type module para hacer
import Express from "express";
import { MongoClient, ObjectId } from "mongodb"; //gestor de la bd, con mongoose o prisma tambien se puede hacer
import Cors from 'cors' //import const (pkg de node.js) sirve para que express puede compartir recursos entre varias fuentes
import dotenv from 'dotenv' //se agrego libreria para la var de entorno
import jwt from 'express-jwt';  // se agrega import para autenticacion
import jwks from 'jwks-rsa';    // se agrega import para autenticacion
import jwt_decode from 'jwt-decode'; //se importa para el desencriptado del token

dotenv.config({ path: './.env' }) //ruta del archivo .env

//conexion a la bd
const stringbaseDeDatos = process.env.DATABASE_URL;

// crear instancia de mongoclient
const client = new MongoClient(stringbaseDeDatos, {
    useNewUrlParser: true, //siempre va segun la documentacion de mongodb
    useUnifiedTopology: true,
})

//varible global de conexion (hace referencia a la bd), esto luego se cambiara
let baseDeDatos;

const app = Express()//nombre app
app.use(Express.json())//para habilitar json en express, extraer la info util
app.use(Cors())// use cors, compartir recursos entre multiples servidores

//-----------------JWT PARA AUTENTICACION ---------------------

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://misiontic-figurascoleccion.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-autenticacion-figuras-mintic',
    issuer: 'https://misiontic-figurascoleccion.us.auth0.com/',
    algorithms: ['RS256']
});
//PASO 4 Y 5, ENVIARLE EL TOKEN A AUTH0 PARA QUE DEVUELVE SI ES VALIDO O NO
app.use(jwtCheck);

//----------------USUARIOS---------------------------------
//se necesita crear las rutas del servidor
//ruta tipo get= read del CRUD, tiene 2 parametro. Primero la ruta, segundo la funcion que se ejecuta cuando alguien hace una peticion a esa ruta (callback)
app.get('/usuarios', (req, res) => {
    console.log("se hizo get al servidor en la ruta /usuarios")
    /*
    const usuariosBackend = [
        {nombre: 'Juana', contrase??a: '1234', rol: 'vendedor', celular: '3213213214'},
        {nombre: 'Sebastian', contrase??a: '4567', rol: 'usuario', celular: '3143143146'},
        {nombre: 'Felipe', contrase??a: '7894', rol: 'usuario', celular: '3693693695'},
        {nombre: 'Laura', contrase??a: 'boba', rol: 'usuario', celular: '3693693695' }];*/
    
    //busque la coleccion usuario 
    baseDeDatos.collection('usuarios')
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

const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando los usuarios');
    } else {
        res.json(result);
    }
};


app.get('/usuarios/self', (req, res) => {
    console.log("se hizo get al servidor en la ruta /usuarios/self")
    consultarOCrearUsuario(req, genericCallback(res));
})

// funcion que controla si el usuario ya existe en la bbdd o sino lo crea
const consultarOCrearUsuario = async (req, callback) => {
    //6.1. se obtienen los datos del usuarios desde el token
    const token = req.headers.authorization.split("Bearer ")[1]; //primero se separa en una variable, solo el token
    const user = jwt_decode(token)['http://localhost/userData']; //se muestra informacion legible (desencripptado) y solo los datos del usuario
    //console.log("user data ", user)
    
    //6.2. se verifica si el usuario esta en la db o no (con correo o id de auth0)
    await baseDeDatos.collection("usuarios").findOne({ email: user.email }, async (err, response) => {
        //console.log("respuesta de la consulta db", response)        
        if (response) {
            // 7.1. si el usuario ya esta en la BD devuelve la info
            callback(err, response)
        } else {
            //para conservar el ID de mongo y el de auth0
            user.auth0ID = user._id;
            delete user._id;
            user.rol = "Inactivo"

            // 7.2. sino, crea un usuario y devuelve la info
            await crearUsuario(user,
                (err, respuesta) => callback(err, user))
        }
    
    })    
}
const crearUsuario = async (datosUsuario, callback) => {
    await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
};

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
        if ( //las validaciones que se quieran hacer, este es un ej dummy
            Object.keys(datosUsuario).includes('name') &&
            Object.keys(datosUsuario).includes('password') &&
            Object.keys(datosUsuario).includes('rol') &&
            Object.keys(datosUsuario).includes('cel')
        ) {

            //implentar codifo para crear usuario en la bd
            //se usan funciones especificas de mongo, en una "archivo" lalamaod usuario agregame los datosUsuario recibidos desde el front
            baseDeDatos.collection('usuarios').insertOne(datosUsuario,
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

//ruta update= patch
app.patch("/usuarios/editar", (req, res) => {
    const edicion = req.body;
    delete edicion.id; //para que no agregue el id en la actualizacion 
    const filtroUsuario = { _id: new ObjectId(edicion._id) } //se extrae el id en un nuevo objeto de mongo tipo objectId
    delete edicion._id;
    console.log(edicion)
    const operacion = { //operacion atomica
        $set: edicion //para que haga la edicion
    }
    baseDeDatos.collection('usuarios').
        findOneAndUpdate(filtroUsuario, operacion, //puedo editar 1 o varios parametros
        {upsert: true, returnOriginal:true},
        (err, result) => {
            if (err) {
                console.error('error actualizando el usuario: ', err)
                res.sendStatus(500)
            } else {
                console.log('actualizado con exito')
                res.sendStatus(200)
            }
    })
})

app.delete("/usuarios/eliminar", (req, res) => {
    const edicion = req.body;
    const filtroUsuario = { _id: new ObjectId(edicion.id) } //se extrae el id en un nuevo objeto de mongo tipo objectId
    baseDeDatos.collection('usuarios')
        .deleteOne(filtroUsuario, (err, resul) => {
            if (err) {
                console.error('error eliminando el usuario: ', err)
                res.sendStatus(500)
            } else {
                console.log('eliminado con exito')
                res.sendStatus(200)
            }
        })
})



//----------------VENDEDORES------------------------------------------------------------------
app.get('/Vendedores', (req, res) => {
    console.log("se hizo get al servidor en la ruta /Vendedores")
    
    baseDeDatos.collection('Vendedores')
        .find({}) 
        .limit(20) 
        .toArray((err, result) => { 
            if (err) {
                res.status(400).send("Error consultando los Vendedores")
            }
            else {
                res.json(result); 
            }
        })
})

app.post("/Vendedores/nuevo", (req, res) => { 
    const datosVendedor = req.body;
    console.log("Vendedor a crear: ", Object.keys(datosVendedor))
    try {
        if ( //las validaciones que se quieran hacer
            Object.keys(datosVendedor).includes('name')
        ) {
            baseDeDatos.collection('Vendedores').insertOne(datosVendedor,
                (err, result) => {
                    if (err) { 
                        console.error(err)
                        res.sendStatus(500)
                    } else {
                        console.log(result)
                        res.sendStatus(200)
                    }
                })
        } else {
            res.sendStatus(500)
        }
    } catch {
        res.sendStatus(500)
    }
})

//ruta update= patch
app.patch("/Vendedores/editar", (req, res) => {
    const edicion = req.body;
    delete edicion.id; 
    const filtroVendedor = { _id: new ObjectId(edicion._id) }
    delete edicion._id;
    console.log(edicion)
    const operacion = { $set: edicion }
    baseDeDatos.collection('Vendedores').
        findOneAndUpdate(filtroVendedor, operacion, 
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if (err) {
                    console.error('error actualizando el vendedor: ', err)
                    res.sendStatus(500)
                } else {
                    console.log('actualizado con exito')
                    res.sendStatus(200)
                }
            })
})

app.delete("/Vendedores/eliminar", (req, res) => {
    const edicion = req.body;
    const filtroVendedor = { _id: new ObjectId(edicion.id) } 
    baseDeDatos.collection('Vendedores')
        .deleteOne(filtroVendedor, (err, resul) => {
            if (err) {
                console.error('error eliminando el vendedor: ', err)
                res.sendStatus(500)
            } else {
                console.log('eliminado con exito')
                res.sendStatus(200)
            }
        })
})


//----------------VENTAS------------------------------------------------------------------
app.get('/Ventas', (req, res) => {
    console.log("se hizo get al servidor en la ruta /Ventas")

    baseDeDatos.collection('Ventas')
        .find({})
        .limit(20)
        .toArray((err, result) => {
            if (err) {
                res.status(400).send("Error consultando las ventas")
            }
            else {
                res.json(result);
            }
        })
})

app.post("/Ventas/nueva", (req, res) => {
    const datosVenta = req.body;
    console.log("Venta a crear: ", Object.keys(datosVenta))
    try {
        if ( //las validaciones que se quieran hacer
            Object.keys(datosVenta).includes('descripcion')
        ) {
            baseDeDatos.collection('Ventas').insertOne(datosVenta,
                (err, result) => {
                    if (err) {
                        console.error(err)
                        res.sendStatus(500)
                    } else {
                        console.log(result)
                        res.sendStatus(200)
                    }
                })
        } else {
            res.sendStatus(500)
        }
    } catch {
        res.sendStatus(500)
    }
})

//ruta update= patch
app.patch("/Ventas/editar", (req, res) => {
    const edicion = req.body;
    delete edicion.id;
    const filtroVenta = { _id: new ObjectId(edicion._id) }
    delete edicion._id;
    console.log(edicion)
    const operacion = { $set: edicion }
    baseDeDatos.collection('Ventas').
        findOneAndUpdate(filtroVenta, operacion,
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if (err) {
                    console.error('error actualizando la venta: ', err)
                    res.sendStatus(500)
                } else {
                    console.log('actualizado con exito')
                    res.sendStatus(200)
                }
            })
})

app.delete("/Ventas/eliminar", (req, res) => {
    const edicion = req.body;
    const filtroVenta = { _id: new ObjectId(edicion.id) }
    baseDeDatos.collection('Ventas')
        .deleteOne(filtroVenta, (err, resul) => {
            if (err) {
                console.error('error eliminando la venta: ', err)
                res.sendStatus(500)
            } else {
                console.log('venta eliminada con exito')
                res.sendStatus(200)
            }
        })
})



//funcion main como en python que la ejecuta y return el listen
const main = () => {
    //este codigo siempre se copia, buscar en la documentacio
    client.connect((err, db) => { //retorna un error y una db
        if (err) {
            console.error('Error conectando a la base de datos')
        }
        //se le asigna un valor a la let baseDeDatos
        baseDeDatos = db.db('xforce')
        console.log("conexion base de datos exitosa")

        const port = process.env.PORT;
        return (
            //decirle a la app que este escuchando los eventos, sirve para abrir el canal de comunicacion
            //se pone el  puerto 5000 para express por convencion deberia correr en 5000 o 5050
            app.listen(port, () => {
                console.log(`El puerto ${port} esta escuchando`)
            }
            )// los console.log se muiestran sobre la terminal de vscode porque esta corriendo en el servidor y NO en el navegador del cliente)
        )
    })    
}

main();//para ejecutar la funcion main