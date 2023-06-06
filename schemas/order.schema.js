const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            productId: {type:Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number,required: true, min: 1},
            price: {type: Number,required: true, min: 0, max:10000000}

        },
    ],
    total: { type: Number, required: true, min: 1},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, required: true, default: Date.now},
    status:{type:String, default:'onhold' , enum:['onhold','inprogress','done']},
    // updateAt:
    //metodo de pago
    // estado del pago
    //direccion de delivery



})

module.exports = mongoose.model('Order', orderSchema);