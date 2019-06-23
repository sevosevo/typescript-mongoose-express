import { Schema } from 'mongoose';


interface User{
    email: string,
    password: string,
    created_at?: string,
    avatar?: string,
    todos?: Array<Schema.Types.ObjectId>
}

export default User;