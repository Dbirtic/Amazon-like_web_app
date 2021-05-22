import dashboardMenu from "../src/components/dashboardmenu";

const dashboardPage = {
    after_render: () => {},
    render: () => {
        return `
            <div class="dashboard">
                ${dashboardMenu.render({selected: 'dashboard'})}
                <div class="dashboard-content">
                    <h1>Dashboard</h1>
                    <div>
                        Info and Charts will be added here
                    </div>
                </div>
            </div>
        `;
    },
};

export default dashboardPage;