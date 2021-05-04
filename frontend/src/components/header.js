import { getUserInfo } from "../localstorage";

const header = {
    render: () =>{
        const {name} = getUserInfo();
        return `
        <div class="brand">
            <a href="/#/">Web Store</a>
        </div>
        <div>
            ${name ? `<a href="/#/profile">${name}</a>` : `<a href="/#/signin">Sign In</a>`}
            <a href="/#/cart">Cart</a>
        </div>
        `;
    },
    after_render: () =>{

    },
};

export default header;