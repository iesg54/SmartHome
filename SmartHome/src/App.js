import { useState, useEffect, useCallback } from "react";
import useWebSocket from "react-use-websocket";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

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

// Material Dashboard 2 React components
import MDSnackbar from "components/MDSnackbar";

import { getUserInfo, getDivisions, addAlert } from "appServices";

export default function App() {
    const [isLogged, setIsLogged] = useState(null);
    useEffect(() => {
        const userLogged = localStorage.getItem("token");
        if (userLogged) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    // Websocket Connection
    const [socketUrl, setSocketUrl] = useState("ws://localhost:8765");
    const [messageHistory, setMessageHistory] = useState([]);
    const [lastMessageReceived, setLastMessageReceived] = useState(null);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: () => console.log("opened"),
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(async () => {
        if (lastMessage !== null) {
            setMessageHistory([...messageHistory, JSON.parse(lastMessage.data)]);
            const messageData = JSON.parse(lastMessage.data);
            setLastMessageReceived({
                title: messageData.sensor,
                message: messageData.mensagem + " " + messageData.value,
                dateTime: messageData.stamp,
            });
            const response = await addAlert(messageData);
        }
    }, [lastMessage]);

    const handleSendMessage = useCallback((message) => sendMessage(message), [sendMessage]);

    useEffect(() => {
        if (isLogged) {
            handleSendMessage(JSON.stringify({ type: "react" }));
        }
    }, [isLogged]);

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

    // get divisions from API and add to routes http://localhost:8080/smarthome/private/house/1/divisions
    const [user, setUser] = useState({});
    const [divisionsRoutes, setDivisionsRoutes] = useState([]);
    const [addDeviceRoutes, setAddDeviceRoutes] = useState([]);

    useEffect(async () => {
        const user = await getUserInfo();
        setUser(user);

        const divisions = await getDivisions(user.casa.id);

        const divisionsRoutes = divisions.map((division) => {
            return {
                key: division.id,
                route: `/division/${division.id}`,
                component: <Division />,
            };
        });
        setDivisionsRoutes(divisionsRoutes);

        const addDeviceRoutes = divisions.map((division) => {
            return {
                key: division.id,
                route: `/adicionarEquipamento/${division.id}`,
                component: <AdicionarEquipamento />,
            };
        });
        setAddDeviceRoutes(addDeviceRoutes);
    }, []);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const toggleSnackbar = () => {
        setShowSnackbar(!showSnackbar);
    };

    useEffect(() => {
        if (lastMessageReceived) {
            setShowSnackbar(true);
        }
    }, [lastMessageReceived]);

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
                </>
            )}
            <Routes>
                {getRoutes(routes)}
                {getRoutes(divisionsRoutes)}
                {getRoutes(addDeviceRoutes)}
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/logout" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/addDivision" element={<AdicionarDivisao />} />
                <Route path="/" element={<SignIn />} />
            </Routes>
            {isLogged && lastMessageReceived && (
                <MDSnackbar
                    open={showSnackbar}
                    close={toggleSnackbar}
                    color="error"
                    content={lastMessageReceived.message}
                    title={lastMessageReceived.title}
                    dateTime={lastMessageReceived.dateTime}
                    icon="notifications"
                />
            )}
        </ThemeProvider>
    );
}
