import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import { Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import NotificationItem from "examples/Items/NotificationItem";

import { getUserInfo, getAlerts } from "appServices";

// Custom styles for DashboardNavbar
import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";

import findSensorIcon from "./findSensorIcon";

function DashboardNavbar({ absolute, light, isMini }) {
    const token = localStorage.getItem("token");
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const [user, setUser] = useState({});
    const [alerts, setAlerts] = useState([]);
    useEffect(async () => {
        const user = await getUserInfo(token);
        setUser(user);
        const alerts = await getAlerts(user.casa.id);
        setAlerts(alerts);
    }, []);

    useEffect(() => {
        // Setting the navbar type
        if (fixedNavbar) {
            setNavbarType("sticky");
        } else {
            setNavbarType("static");
        }

        // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
        }

        /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
        window.addEventListener("scroll", handleTransparentNavbar);

        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();

        // Remove event listener on cleanup
        return () => window.removeEventListener("scroll", handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const handleOpenUserMenu = (event) => setOpenUserMenu(event.currentTarget);
    const handleCloseUserMenu = () => setOpenUserMenu(false);

    // Render the notifications menu
    const renderMenu = () => {
        return (
            <Menu
                anchorEl={openMenu}
                anchorReference={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
                sx={{ mt: 2 }}
            >
                <Grid container direction="column" sx={{ p: 2 }}>
                    <MDTypography variant="h6" fontWeight="bold">
                        Últimos Alertas
                    </MDTypography>
                </Grid>
                <Grid container direction="column" sx={{ p: 2 }}>
                    {alerts.slice(0, 5).map((alert) => (
                        <Link to={"/division/" + alert.div.id}>
                            <NotificationItem
                                icon={<Icon>{findSensorIcon(alert.sensor)}</Icon>}
                                title={"Divisão: " + alert.div.nome + " | " + alert.sensor + " (" + alert.valor + ")"}
                            />
                        </Link>
                    ))}
                </Grid>
            </Menu>
        );
    };

    const renderUserMenu = () => (
        // menu with profile image, name and email
        <Menu
            anchorEl={openUserMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={Boolean(openUserMenu)}
            onClose={handleCloseUserMenu}
            sx={{ mt: 2 }}
        >
            <Grid container direction="column" alignItems="center" sx={{ p: 2 }}>
                <MDAvatar
                    alt="User avatar"
                    src={user.profileImage}
                    bgColor="dark"
                    size="lg"
                    shadow="lg"
                    sx={{ mb: 1 }}
                />
                <MDTypography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {user.nome}
                </MDTypography>
                <MDTypography variant="body2" color="secondary">
                    {user.email}
                </MDTypography>
            </Grid>
        </Menu>
    );

    // Styles for the navbar icons
    const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
        color: () => {
            let colorValue = light || darkMode ? white.main : dark.main;

            if (transparentNavbar && !light) {
                colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
            }

            return colorValue;
        },
    });

    return (
        <AppBar
            position={absolute ? "absolute" : navbarType}
            color="inherit"
            sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <MDBox
                    color="inherit"
                    mb={{ xs: 1, md: 0 }}
                    sx={(theme) => navbarRow(theme, { isMini })}
                ></MDBox>
                {isMini ? null : (
                    <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                        <MDBox color={light ? "white" : "inherit"}>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarMobileMenu}
                                onClick={handleMiniSidenav}
                            >
                                <Icon sx={iconsStyle} fontSize="medium">
                                    {miniSidenav ? "menu_open" : "menu"}
                                </Icon>
                            </IconButton>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarIconButton}
                                aria-controls="notification-menu"
                                aria-haspopup="true"
                                variant="contained"
                                onClick={handleOpenMenu}
                            >
                                <Icon sx={iconsStyle}>notifications</Icon>
                            </IconButton>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarIconButton}
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                variant="contained"
                                onClick={handleOpenUserMenu}
                            >
                                <Icon sx={iconsStyle}>person</Icon>
                            </IconButton>
                            {user.id && renderMenu()}
                            {user.id && renderUserMenu()}
                        </MDBox>
                    </MDBox>
                )}
            </Toolbar>
        </AppBar>
    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;
