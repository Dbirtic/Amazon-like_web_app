import homePage from '../screens/homepage.js';
import productPage from '../screens/productpage.js';
import { parseRequestUrl } from './utils.js';
import errorPage from '../screens/errorpage.js';

// routes object with javascript rendered pages
const routes = {
    "/": homePage,
    "/product/:id": productPage,
}

const router = () =>{
    const request = parseRequestUrl();

    // parseUrl directly compares the values inside the url
    const parseUrl = (request.resource ? `/${request.resource}` : "/") + (request.id? "/:id":"") + (request.verb ? `/${request.verb}`:"");
    
    // screen checks if the routes has a valid url and shows it otherwise it opens an error page
    const screen = routes[parseUrl] ? routes[parseUrl] : errorPage;

    const main = document.getElementById("main-container");
    main.innerHTML = screen.render();
}

window.addEventListener('load', router);

window.addEventListener('hashchange', router);