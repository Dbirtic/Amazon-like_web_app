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
        const cartItems = getCartItems();
        return `
        <div class="content cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length === 0
                        ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                        : cartItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}" />
                                </div>

                                <div class="cart-name">
                                    <div>
                                        <a href="/#/product/${item.product}">
                                            ${item.name}
                                        </a>
                                    </div>
                                    <div>
                                        Qty: <select class="qty-select" id="${item.product}">
                                        <option value="1">1</option>
                                        </select>
                                        <button type="button" class="delete-button" id="${item.product}">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div class="cart-price">
                                    $${item.price}
                                </div>
                            </li>
                        `).join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
                <h3>
                    Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :
                    $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button id="checkout-button" class="primary">
                    Proceed to Checkout
                </button>
            </div>
        </div>
        `;
    }
}

export default cartPage;