import homePage from '../screens/homepage.js';
const router = () =>{
    const main = document.getElementById("main-container");
    main.innerHTML = homePage.render();
}

window.addEventListener('load', router);