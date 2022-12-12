/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Division from "layouts/division";
import Users from "layouts/users";
import AdicionarEquipamento from "layouts/equipamento";
import EditarPerfil from "layouts/editarPerfil";

// @mui icons
import Icon from "@mui/material/Icon";

// Axios
import axios from "axios";

// get userID and casaID from local storage
const casaID = localStorage.getItem("CasaID");

const routes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "Utilizadores",
        key: "users",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/users",
        component: <Users />,
    },
    {
        type: "collapse",
        name: "EditarPerfil",
        key: "editarPerfil",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/editarPerfil",
        component: <EditarPerfil />,
    },
    {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/authentication/sign-in",
        component: <SignIn />,
    },
    {
        type: "collapse",
        name: "Sign Up",
        key: "sign-up",
        icon: <Icon fontSize="small">assignment</Icon>,
        route: "/authentication/sign-up",
        component: <SignUp />,
    },
];

// get divisions from API and add to routes http://localhost:8080/smarthome/private/house/1/divisions
const divisionsRoutes = [];
axios
    .get(`http://localhost:8080/smarthome/private/house/${casaID}/divisions`)
    .then((response) => {
        const divisions = response.data;
        divisions.forEach((division) => {
            divisionsRoutes.push({
                type: "collapse",
                name: division.nome,
                key: division.id,
                icon: <Icon fontSize="small">devices</Icon>,
                route: `/division/${division.nome}`,
                component: <Division divisionID={division.id} divisionName={division.nome} />,
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });

// get divisions from API and add to routes http://localhost:8080/smarthome/private/house/1/divisions
const addDeviceRoutes = [];
axios.get(`http://localhost:8080/smarthome/private/house/${casaID}/divisions`).then((response) => {
    const divisions = response.data;
    divisions.forEach((division) => {
        addDeviceRoutes.push({
            type: "collapse",
            name: division.nome,
            key: division.id,
            icon: <Icon fontSize="small">devices</Icon>,
            route: `/adicionarEquipamento/${division.nome}`,
            component: <AdicionarEquipamento divisionID={division.id} />,
        });
    });
});

export { routes, divisionsRoutes, addDeviceRoutes };
