import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // if no name is entered then error will occur
    name: {type:String, required:true},
    email: {
        type: String, required: true, index: true, unique: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;