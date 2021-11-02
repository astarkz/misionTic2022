//hacer el import de express antiguamente
//const express = require('express');

//se debe modificar el pkg.json para agregar type module para hacer
import Express from "express";

import Cors from 'cors' //import const (pkg de node.js) sirve para que express puede compartir recursos entre varias fuentes
import dotenv from 'dotenv' //se agrego libreria para la var de entorno
import { conectarBD, getDB } from './db/db.js'
import { ObjectId } from "mongodb";


dotenv.config({ path: './.env' }) //ruta del archivo .env

const app = Express()//nombre app
app.use(Express.json())//para habilitar json en express, extraer la info util
app.use(Cors())// use cors, compartir recursos entre multiples servidores


//----------------VENDEDORES------------------------------------------------------------------
app.get('/Vendedores', (req, res) => {
    console.log("se hizo get al servidor en la ruta /Vendedores")
    
    baseDeDatos.collection('Vendedores')
        .find({}) 
        .limit(10) 
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
    const filtroUsuario = { _id: new ObjectId(edicion._id) }
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


//funcion main como en python que la ejecuta y return el listen
const main = () => { 
    const port = process.env.PORT;
    return //decirle a la app que este escuchando los eventos, sirve para abrir el canal de comunicacion
    //se pone el  puerto 5000 para express por convencion deberia correr en 5000 o 5050
    app.listen(port, () => {
        console.log(`alguien escucha el puerto ${port}`)
    })
}

conectarBD(main)
//main();//para ejecutar la funcion main