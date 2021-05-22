import homePage from '../screens/homepage';
import productPage from '../screens/productpage';
import { parseRequestUrl, showLoading, hideLoading } from './utils';
import errorPage from '../screens/errorpage';
import cartPage from '../screens/cartpage';
import signinPage from '../screens/signinpage';
import header from './components/header';
import registerPage from '../screens/registerpage';
import profilePage from '../screens/profilepage';
import shippingPage from '../screens/shippingpage';
import paymentPage from '../screens/paymentpage';
import placeOrderPage from '../screens/placeOrderPage';
import orderPage from '../screens/orderpage';
import dashboardPage from '../screens/dashboardpage';

// routes object with javascript rendered pages
const routes = {
    "/": homePage,
    "/product/:id": productPage,
    "/cart/:id": cartPage,
    "/order/:id": orderPage,
    "/cart": cartPage,
    "/signin": signinPage,
    "/register": registerPage,
    "/profile": profilePage,
    "/shipping": shippingPage,
    "/payment": paymentPage,
    "/placeorder": placeOrderPage,
    "/dashboard": dashboardPage,
}

const router = async () =>{
    showLoading();

    const request = parseRequestUrl();

    // parseUrl directly compares the values inside the url
    const parseUrl = (request.resource ? `/${request.resource}` : "/") + (request.id? "/:id":"") + (request.verb ? `/${request.verb}`:"");
    
    // screen checks if the routes has a valid url and shows it otherwise it opens an error page
    const screen = routes[parseUrl] ? routes[parseUrl] : errorPage;

    const headerVar = document.getElementById("header-container");
    headerVar.innerHTML = await header.render();
    await header.after_render();

    const main = document.getElementById("main-container");
    // await is used here because render is async function
    main.innerHTML = await screen.render();
    if(screen.after_render)
        await screen.after_render();
    hideLoading();
}

window.addEventListener('load', router);

window.addEventListener('hashchange', router);