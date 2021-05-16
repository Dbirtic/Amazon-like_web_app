import { parseRequestUrl } from "../src/utils";
import { getOrder } from "../src/api";


const orderPage = {
    after_render: async() => {},
    render: async() =>{
        // request information
        const request = parseRequestUrl();
        console.log(`request: ${request}`);
        console.log(request);

        // sending ajax request to the server to get information about order
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = await getOrder(request.id);
        console.log(_id);
        console.log(shipping);
        console.log(payment);
        console.log(orderItems);
        console.log(itemsPrice);
        console.log(shippingPrice);
        console.log(taxPrice);
        console.log(totalPrice);
        return `
        <div>
          <h1>Order ${_id}</h1>
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
            </div>
          </div>
        </div>
        `;
    },
};

export default orderPage;