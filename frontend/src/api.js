import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localstorage";

export const getProduct = async (id) => {
    // sending an ajax GET request to the server to get data for products
    try {
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return { error: err.response.data.message || err.message};
    }
};

export const signin = async({email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const register = async({name, email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const update = async({name, email, password}) => {
    try{
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',  // PUT is for updating a resource
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const createOrder = async(order) =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        return {error: (err.response ? err.response.data.message : err.message)};
    }
}