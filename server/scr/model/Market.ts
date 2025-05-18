import mongoose, { Document, Model, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    producerId: mongoose.Schema.Types.ObjectId; // Kapcsolat a termelővel
}


const ProductSchema:Schema<IProduct> = new mongoose.Schema({
        name: { type: String, required: true },
        description: { type: String, required: false },
         price: { type: Number, required: true },
         producerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
//export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);  