import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DivisionCard from "./components/DivisionCard";

// Components
import HomeStats from "./components/HomeStats";
import selectDivisionImage from "./selectDivisionImage";

import { getUserInfo, getDivisions } from "appServices";
import {
    getEnergyCost,
    getEnergyCostInfoLastWeek,
    getEnergyCostInfoLastMonth,
    deleteDivision,
} from "./dashboardServices";

function Dashboard() {
    const navigate = useNavigate();

    // check if the user is logged in else redirect to the login page
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setIsLogged(false);
            navigate("/login");
        } else {
            setIsLogged(true);
        }
    }, []);

    // User Data
    const [userData, setUserData] = useState();

    // House Divisions
    const [divisions, setDivisions] = useState([]);

    // Energy Cost
    const [energyCost, setEnergyCost] = useState([]);

    // Energy Cost Info for the last week
    const [energyCostPerWeekDay, setEnergyCostPerWeekDay] = useState([]);
    const [energyCostPerDivision, setEnergyCostPerDivision] = useState([]);
    const [lastWeek, setLastWeek] = useState([]);

    // Energy Cost Info for the last month
    const [energyCostPerMonthDay, setEnergyCostPerMonthDay] = useState([]);
    const [energyCostPerMonthDivision, setEnergyCostPerMonthDivision] = useState([]);
    const [lastMonth, setLastMonth] = useState([]);

    useEffect(async () => {
        const user = await getUserInfo();
        setUserData(user);
        const divisions = await getDivisions(user.casa.id);
        setDivisions(divisions);
        const energyCost = await getEnergyCost(user.casa.id);
        setEnergyCost(energyCost);
        const energyCostWeek = await getEnergyCostInfoLastWeek(user.casa.id);
        setEnergyCostPerWeekDay(energyCostWeek.costPerDay);
        setEnergyCostPerDivision(energyCostWeek.costPerDivision);
        setLastWeek(energyCostWeek.lastWeek);
        const energyCostMonth = await getEnergyCostInfoLastMonth(user.casa.id);
        setEnergyCostPerMonthDay(energyCostMonth.costPerDay);
        setEnergyCostPerMonthDivision(energyCostMonth.costPerDivision);
        setLastMonth(energyCostMonth.lastMonth);
    }, []);

    // Tab index for the home stats
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const handleDeleteDivision = (divID) => {
        if (deleteDivision(userData.casa.id, divID)) {
            setDivisions(divisions.filter((division) => division.id !== divID));
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center" mb={4}>
                    <MDTypography variant="h2">Aqui estão as divisões da tua casa...</MDTypography>
                </Grid>
                <Grid container spacing={3} justifyContent="center">
                    {divisions.map((division) => (
                        <Grid item xs={12} sm={6} md={3} key={division.id}>
                            <MDBox mb={3}>
                                <DivisionCard
                                    image={selectDivisionImage(division.tipo)}
                                    name={division.nome}
                                    energyConsumption={energyCost[division.id]}
                                    action={{
                                        type: "internal",
                                        route: `/division/${division.id}`,
                                        color: "dark",
                                        label: "Ver",
                                    }}
                                    handleDeleteDiv={() => handleDeleteDivision(division.id)}
                                />
                            </MDBox>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        {userData && userData.admin && (
                            <Link to="/addDivision">
                                <MDButton variant="contained" color="primary" fullWidth>
                                    Adicionar divisão
                                </MDButton>
                            </Link>
                        )}
                    </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={3} justifyContent="center" mt={3}>
                    <MDTypography variant="h2">Quanto é que estás a gastar?</MDTypography>
                </Grid>
                <MDBox py={3}>
                    <Grid container justifyContent="center" mb={4}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Tabs value={tabIndex} onChange={handleTabChange}>
                                <Tab label="Semana" />
                                <Tab label="Mês" />
                            </Tabs>
                        </Grid>
                    </Grid>
                    <Grid container mb={4}>
                        {tabIndex === 0 && (
                            <HomeStats
                                LineChartObject={{
                                    title: "Semana",
                                    description: "Gasto energético dos últimos 7 dias",
                                    labels: lastWeek,
                                    data: energyCostPerWeekDay,
                                }}
                                PieChartObject={{
                                    title: "Semana",
                                    description: "Gasto energético por divisão",
                                    labels: divisions.map((division) => division.nome),
                                    data: energyCostPerDivision,
                                }}
                            />
                        )}
                        {tabIndex === 1 && (
                            <HomeStats
                                LineChartObject={{
                                    title: "Mês",
                                    description: "Gasto energético dos últimos 30 dias",
                                    labels: lastMonth,
                                    data: energyCostPerMonthDay,
                                }}
                                PieChartObject={{
                                    title: "Mês",
                                    description: "Gasto energético por divisão",
                                    labels: divisions.map((division) => division.nome),
                                    data: energyCostPerMonthDivision,
                                }}
                            />
                        )}
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Dashboard;
