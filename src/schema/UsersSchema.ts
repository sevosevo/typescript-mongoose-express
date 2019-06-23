import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'todos'
    }]
});

UserSchema.methods.hashMe = async() => {

    const salt = await bcrypt.genSalt(16);

    return await bcrypt.hash(this.password, salt);

};

export default UserSchema;