import { register } from "../src/api";
import { getUserInfo, setUserInfo } from "../src/localstorage";
import { showLoading, hideLoading, showMessage } from "../src/utils";

// Sign in page object which contains after_render and render functions
const registerPage = {
    after_render:() => {
        document.getElementById("register-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else{
                setUserInfo(data);
                document.location.hash = "/";
            }
        });
    },
    render: () => {
        if(getUserInfo().name){
            document.location.hash = '/';
        }
        return `
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h1>Register an Account</h1>
                        </li>
                        <li>
                            <label for="name">Name</label>
                            <input type="name" name="name" id="name" />
                        </li>
                        <li>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" />
                        </li>
                        <li>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" />
                        </li>
                        <li>
                            <label for="repassword">Confirm Password</label>
                            <input type="password" name="repassword" id="repassword" />
                        </li>
                        <li>
                            <button type="submit" class="primary">Register</button>
                        </li>
                        <li>
                            <div>Already have an account?
                                <a href="/#/signin">Sign in</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    },
}

// TO DO:
// note to self, the sign in button has to have a different class
// it is ugly and needs to be changed

export default registerPage;