const {Schema, model} =require('mongoose');

const ProductsSchema = Schema ({
    client:{
        type: Schema.Types.ObjectId,
        ref:"Clientes",
        required: [true, 'El Cliente es requerido']
    },
    name: {
        type: String, 
        required: [true, 'El nombre es requerido']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:"CategoriasProductos", 
        required: [true, 'La categoria es requerida']
    },
    price:{
        type:Number,
        required: [true, 'El precio es requerido']
    },
    percentage: {
        type: Number,
        required: [true, "no se ha ingresado un porcentaje al producto"]
    },
    discount:{
        type: Boolean,
        required: [true, 'El descuento es requerido']
    },
    public: {
        type: Boolean,
        default: true
    },
    cycle: {
        type: Number,
        required: [true, "no se ha ingresado un ciclo al producto"]
    },
    pay: {
        type: Schema.Types.ObjectId,
        ref:"TipoDePago",
        required: [true, 'El Tipo de Pago es requerido']
    }
})

module.exports = model("Productos",ProductsSchema); 