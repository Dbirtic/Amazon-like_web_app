import homePage from '../screens/homepage';
import productPage from '../screens/productpage';
import { parseRequestUrl, showLoading, hideLoading } from './utils';
import errorPage from '../screens/errorpage';
import cartPage from '../screens/cartpage';
import signinPage from '../screens/signinpage';
import header from './components/header';

// routes object with javascript rendered pages
const routes = {
    "/": homePage,
    "/product/:id": productPage,
    "/cart/:id": cartPage,
    "/cart": cartPage,
    "/signin": signinPage,
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
    await screen.after_render();
    hideLoading();
}

window.addEventListener('load', router);

window.addEventListener('hashchange', router);