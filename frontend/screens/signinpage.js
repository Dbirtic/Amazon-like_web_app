import { signin } from "../src/api";
import { getUserInfo, setUserInfo } from "../src/localstorage";
import { showLoading, hideLoading, showMessage } from "../src/utils";

// Sign in page object which contains after_render and render functions
const signinPage = {
    after_render:() => {
        document.getElementById("signin-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await signin({
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
                <form id="signin-form">
                    <ul class="form-items">
                        <li>
                            <h1>Sign In</h1>
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
                            <button type="submit" class="primary">Sign In</button>
                        </li>
                        <li>
                            <div>New User?
                                <a href="/#/register">Create your account</a>
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

export default signinPage;