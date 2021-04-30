import { parseRequestUrl } from "../src/utils";
import { getProduct } from "../src/api";

const productPage = {
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        return `<h1>${product.name}</h1>`;
    },
};

export default productPage;