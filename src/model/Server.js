const express = require('express'); 
const cors = require('cors');
const morgan = require('morgan'); 
const { dbConnection } = require('../database/connection');
const rutas = require('../router/index');
class Server{
    constructor(){
        this.app = express(); 
        this.app.PORT = process.env.PORT;
        this.middlewares();
        this.DBconexion(); 
        this.router(); 
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); 
        this.app.use(express.static('public'));
        this.app.use(morgan('dev'));
    }
    async DBconexion(){
        await dbConnection();

    }
    router() {
        this.app.get('/', function (req, res) {
            res.send("hola desde el backend!"); 
        }); 
        this.app.get('/segundo-mensaje', function (req, res) {
            res.send("Segundo Mensaje: hola desde el backend!"); 
        }); 
        this.app.use(rutas.rutaLogin); 
        this.app.use(rutas.rutaUser); 
        this.app.use(rutas.rutaRolUser); 
        this.app.use(rutas.rutaStateUser);
        this.app.use(rutas.rutaClientes);
        this.app.use(rutas.rutaTipoDePago); 
        this.app.use(rutas.rutaCategoriaProducto); 
    }
    
    listen(){
        this.app.listen(this.app.PORT, ()=> {
            console.log(`se esta escuchando en el puerto ${this.app.PORT}`);
        })
    }
}

module.exports = Server; 