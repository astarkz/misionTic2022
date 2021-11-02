import Express from "express";

const rutasUsuario = Express.Router();

rutasUsuario.route('/usuarios').get((req, res) => {
    const baseDeDatos = getDB()
    console.log("se hizo get al servidor en la ruta /usuarios")
    
    baseDeDatos.collection('usuarios').find({}).limit(50) 
        .toArray((err, result) => { 
            if (err) {
                res.status(400).send("Error consultando los usuarios")
            }
            else {
                res.json(result); 
            }
        })
})
















//----------------USUARIOS---------------------------------
//se necesita crear las rutas del servidor
//ruta tipo get= read del CRUD, tiene 2 parametro. Primero la ruta, segundo la funcion que se ejecuta cuando alguien hace una peticion a esa ruta (callback)
/*app.get('/usuarios', (req, res) => {
    const baseDeDatos = getDB()
    console.log("se hizo get al servidor en la ruta /usuarios")
    
    const usuariosBackend = [
        {nombre: 'Juana', contraseña: '1234', rol: 'vendedor', celular: '3213213214'},
        {nombre: 'Sebastian', contraseña: '4567', rol: 'usuario', celular: '3143143146'},
        {nombre: 'Felipe', contraseña: '7894', rol: 'usuario', celular: '3693693695'},
        {nombre: 'Laura', contraseña: 'boba', rol: 'usuario', celular: '3693693695' }];/

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
*/
//ruta tipo post=create del crud
//las app tipo post no se pueden hacer desde el navegador, se usa postman o insomnia, sirven para probar solicitudes
app.post("/usuarios/nuevo", (req, res) => { //req =request, res = response
    //se instancia un obj datos usuario a la request
    const datosUsuario = req.body;

    const baseDeDatos = getDB()

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
    const baseDeDatos = getDB()

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
            { upsert: true, returnOriginal: true },
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
    const baseDeDatos = getDB()

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

export default rutasUsuario
