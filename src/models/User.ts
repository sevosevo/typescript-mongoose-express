import mongoose from 'mongoose';
import { Model, Document } from 'mongoose';
import { UserSchema } from "../schema/UsersSchema";
import IUser from '../interfaces/IUser';
import User from "../interfaces/IUser";


/*  IUserModel INCLUDES email, password, created_at, avatar, todos + destroy, save + fullname... */
export interface IUserDocument extends IUser, Document { //Document interface
    hash: () => string;
}

/* IUserModelStatic must extend Model which accept our IUserModel  interface as generic type */
export interface IUserModel extends Model<IUserDocument> {
    findByUsername() : IUserDocument;
}

export const User = mongoose.model<IUserDocument, IUserModel>('users', UserSchema);

