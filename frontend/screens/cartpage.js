import { parseRequestUrl } from "../src/utils";
import { getProduct } from "../src/api";
import { getCartItems, setCartItems } from "../src/localstorage";

function addToCart(item, forceUpdate = false){
    let cartItems = getCartItems();

    // if item that is being added exists already
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        // if an item is added which is already in the basket 
        // then it should be updated in the cart
        // else put current item in the cart items
        cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
    } else{
        // case if the item doesn't exist add item to cart
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
};

const cartPage = {
    after_render:() => {

    },
    render: async () =>
    {
        const request = parseRequestUrl();
        // if product ID exists in the cart then go to the cart page from product page
        // else cart was opened through the cart button
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            });
        }
        return `<div>Cart Page</div>`;
    }
}

export default cartPage;