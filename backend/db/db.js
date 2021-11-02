import { MongoClient } from "mongodb"; //gestor de la bd, con mongoose o prisma tambien se puede hacer

import dotenv from 'dotenv' //se agrego libreria para la var de entorno

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

const conectarBD = (callback) => { //funcion que se ejecura despues de que pasa algo
    //este codigo siempre se copia, buscar en la documentacio
    client.connect((err, db) => { //retorna un error y una db
        if (err) {
            console.error('Error conectando a la base de datos')
        }
        //se le asigna un valor a la let baseDeDatos
        baseDeDatos = db.db('xforce')
        console.log("conexion base de datos exitosa")

        
        return callback();// los console.log se muiestran sobre la terminal de vscode porque esta corriendo en el servidor y NO en el navegador del cliente)
    
    })
}

const getDB = () => {
    return baseDeDatos
}
export {conectarBD, getDB}