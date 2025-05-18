"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    producerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.Product = mongoose_1.default.model('Product', ProductSchema);
//export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);  
