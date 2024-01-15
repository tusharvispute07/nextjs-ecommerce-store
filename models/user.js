const { model, Schema, models } = require("mongoose");

const UserSchema = new Schema({
    name: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    username:{type:String, required:true, unique:true},
    image:{type:String},
    password:{type:String, required:true},
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }]
})

export const User = models?.User || model('User', UserSchema)