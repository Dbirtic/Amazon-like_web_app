import { parseRequestUrl } from "../src/utils";
import { getProduct } from "../src/api";
import rating from '../src/components/rating';

const productPage = {
    // in after_render function we make an object from the requestUrl,
    // we create an event when the add to cart button is clicked and it redirects to the cart
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click', () =>{
            document.location.hash = `/cart/${request.id}`;

        });
    },
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if(product.error){
            return `<div>${product.error}</div>`;
        }
        return `
        <div class="content">
            <div class="back-to-result">
                <a href="/#/">Back to result</a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${rating.render({value: product.rating, text: `${product.numReview} reviews`,})}
                        </li>
                        <li>
                            Price: <strong>$${product.price}</strong>
                        </li>
                        <li>
                            Description:
                            <div>${product.description}</div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>
                            Price: $${product.price}
                        </li>
                        <li>
                            Status:
                                ${product.countInStock > 0 ? `<span class="success">In Stock</span>` : `<span class="error">Unavailable</span>`}
                        </li>
                        <li>
                            <button id="add-button" class="fw primary">Add to cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
    },
};

export default productPage;