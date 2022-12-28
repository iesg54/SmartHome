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

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import { routes } from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// Other
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import AdicionarDivisao from "layouts/adicionarDivisao";
import Division from "layouts/division";
import AdicionarEquipamento from "layouts/equipamento";

// Axios
import axios from "axios";

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        direction,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const { pathname } = useLocation();

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    const configsButton = (
        <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.25rem"
            height="3.25rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleConfiguratorOpen}
        >
            <Icon fontSize="small" color="inherit">
                settings
            </Icon>
        </MDBox>
    );

    const casaID = localStorage.getItem("CasaID");
    // get divisions from API and add to routes http://localhost:8080/smarthome/private/house/1/divisions
    const [divisionsRoutes, setDivisionsRoutes] = useState([]);
    const [addDeviceRoutes, setAddDeviceRoutes] = useState([]);
    
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/house/${casaID}/divisions`)
            .then((response) => {
                const divisions = response.data;
                const divisionsRoutes = divisions.map((division) => {
                    return {
                        key: division.id,
                        route: `/division/${division.nome}`,
                        component: <Division divisionID={division.id} divisionName={division.nome} />,
                    };
                });
                setDivisionsRoutes(divisionsRoutes);

                const addDeviceRoutes = divisions.map((division) => {
                    return {
                        key: division.id,
                        route: `/adicionarEquipamento/${division.nome}`,
                        component: <AdicionarEquipamento divisionID={division.id} />,
                    };
                });
                setAddDeviceRoutes(addDeviceRoutes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                    <Sidenav
                        color={sidenavColor}
                        brand={
                            (transparentSidenav && !darkMode) || whiteSidenav
                                ? brandDark
                                : brandWhite
                        }
                        brandName="SmartHome"
                        routes={routes}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                    <Configurator />
                    {configsButton}
                </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
                {console.log(divisionsRoutes)}
                {getRoutes(routes)}
                {getRoutes(divisionsRoutes)}
                {getRoutes(addDeviceRoutes)}
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/logout" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/addDivision" element={<AdicionarDivisao casaID={casaID}/>} />
            </Routes>
        </ThemeProvider>
    );
}
