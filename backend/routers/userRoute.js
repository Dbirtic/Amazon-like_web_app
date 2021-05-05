import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import UserModel from '../models/userModel';
import { generateToken, isAuth } from '../util';

const userRouter = express.Router();

userRouter.get("/createadmin", expressAsyncHandler( async(req, res) => {
    try{
        const user = new UserModel({
            name:'admin',
            email: 'admin@example.com',
            password: 'jsecommerce',
            isAdmin: true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch(err){
        res.status(500).send({message: err.message});
    }
}));

userRouter.post("/signin", expressAsyncHandler( async (req, res) =>{
    const signinUser = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(!signinUser){
        res.status(401).send({
            message: "Invalid Email or password!!!",
        });
    } else{
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser),
        });
    }
}));

userRouter.post("/register", expressAsyncHandler( async (req, res) =>{
    const registerUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const registeredUser = await registerUser.save();
    if(!registeredUser){
        res.status(401).send({
            message: "Invalid User data!!!",
        });
    } else{
        res.send({
            _id: registeredUser._id,
            name: registeredUser.name,
            email: registeredUser.email,
            isAdmin: registeredUser.isAdmin,
            token: generateToken(registeredUser),
        });
    }
}));

userRouter.put("/:id", isAuth, expressAsyncHandler( async (req, res) =>{
    const registeredUser = await UserModel.findById(req.params.id);

    if(!registeredUser){
        res.status(404).send({
            message: "User not found!!!",
        });
    } else{
        // registered user name is the one passed on the 
        // form or the same one if new one isn't entered
        registeredUser.name = req.body.name || registeredUser.name;
        registeredUser.email = req.body.email || registeredUser.email;
        registeredUser.password = req.body.password || registeredUser.password;

        const updatedUser = await registeredUser.save();

        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));

export default userRouter;