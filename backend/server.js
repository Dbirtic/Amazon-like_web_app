import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './data';
import config from './config';
import userRouter from './routers/userRoute';

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    .then(() => {
        console.log('Connected to mongodb.');
    })
    .catch((err) => {
        console.log(err.reason);
    });

const app = express();

app.use(cors());

app.use('/api/users', userRouter);

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
    // find the data for that product
    const product = data.products.find(x => x._id === req.params.id);
    
    // if this product exists then render its data
    if(product){
        res.send(product);
    }
    // else give error 404 and say that product doesn't exist
    else {
        res.status(404).send({message: 'Product Not Found!' });
    }
});

app.listen(5000, () => {
    console.log("serve at http://localhost:5000");
});