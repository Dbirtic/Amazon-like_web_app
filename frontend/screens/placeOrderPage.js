import { getCartItems, getShipping, getPayment, cleanCart } from "../src/localstorage";
import checkoutSteps from "../src/components/checkoutSteps";
import { showLoading, hideLoading, showMessage } from "../src/utils";
import { createOrder } from "../src/api";

const convertCartToOrder = () =>{
    // this function gets items from localstorage and saves them in order items
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash = '/payment';
    }

    const itemsPrice = orderItems.reduce((a, c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.25 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    };
};

const placeOrderPage = {
    after_render: async() => {
        document.getElementById('placeorder-button').addEventListener('click', async () =>{
          console.log("1");  
          const order = convertCartToOrder();
          console.log("2"); 
          showLoading();
          console.log("3"); 
          const data = await createOrder(order);
          console.log("4"); 
          hideLoading();
          console.log("5"); 
          if(data.error){
            console.log("6"); 
            showMessage(data.error);
            console.log(data.error); 
          } else{
            console.log("log before clean cart");
            cleanCart();
            console.log("clean cart is finished");
            document.location.hash = `/order/${data.order._id}`;
            console.log("document location hash has redirected to the order id: " + data.order._id);
          }
        });
    },
    render: () =>{
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = convertCartToOrder();
        return `
        <div>
          ${checkoutSteps.render({
            step1: true,
            step2: true,
            step3: true,
            step4: true,
          })}
          <div class="order">
            <div class="order-info">
              <div>
                <h2>Shipping</h2>
                <div>
                    ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
                    ${shipping.country}
                </div>
              </div>
              <div>
                <h2>Payment</h2>
                <div>
                  Payment Method : ${payment.paymentMethod}
                </div>
              </div>
              <div>
                <ul class="cart-list-container">
                  <li>
                    <h2>Shopping Cart</h2>
                    <div>Price</div>
                  </li>
                  ${orderItems.map((item) => `
                    <li>
                      <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" />
                      </div>
                      <div class="cart-name">
                        <div>
                          <a href="/#/product/${item.product}">${item.name} </a>
                        </div>
                        <div> Qty: ${item.qty} </div>
                      </div>
                      <div class="cart-price"> $${item.price}</div>
                    </li>
                    `).join('\n')}
                </ul>
              </div>
            </div>
            <div class="order-action">
               <ul>
                    <li>
                      <h2>Order Summary</h2>
                     </li>
                     <li><div>Items</div><div>$${itemsPrice}</div></li>
                     <li><div>Shipping</div><div>$${shippingPrice}</div></li>
                     <li><div>Tax</div><div>$${taxPrice}</div></li>
                     <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li> 
                     <li>
                     <button id="placeorder-button" class="primary fw">
                     Place Order
                     </button>
            </div>
          </div>
        </div>
        `;
    },
};

export default placeOrderPage;