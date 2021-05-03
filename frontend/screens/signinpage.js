
// Sign in page object which contains after_render and render functions
const signinPage = {
    after_render:() => {},
    render: () => {
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
                            <h1>Sign In</h1>
                        </li>

                    </ul>
                </form>
            </div>
        `;
    },
}