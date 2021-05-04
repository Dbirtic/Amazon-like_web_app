export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
}
export const setCartItems = (cartItems) =>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// sets passed values to the values from local storage
export const setUserInfo = ({
    _id="",
    name = "",
    email = "",
    password = "",
    token = "",
    isAdmin = false,
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id,
        name,
        email,
        password,
        token,
        isAdmin,
    }));
};

// returns the values from the local storage if there is something in localstorage else return empty name, password and email
export const getUserInfo = () =>{
    return localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : { name: '', email: '', password: ''};
}