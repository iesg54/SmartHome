import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

// Axios
import axios from "axios";

function Dashboard() {
    // Get UserID and HomeID from local storage
    const userID = localStorage.getItem("userID");
    const casaID = localStorage.getItem("CasaID");

    // Get divisions from the database http://localhost:8080/smarthome/private/house/1/divisions
    const [divisions, setDivisions] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/house/${casaID}/divisions`)
            .then((res) => {
                setDivisions(res.data);
            });
    }, []);

    // Get the energy cost of each division and save it in an array from the database http://localhost:8080/smarthome/private/house/1/energy/current
    const [energyCost, setEnergyCost] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/house/${casaID}/energy/current`)
            .then((res) => {
                // res.data is an array of objects with the following structure:
                // {1: 3232.4700000000003, 2: 1282.4700000000003,}
                // round the energy cost to units of 10W
                for (const key in res.data) {
                    res.data[key] = Math.round(res.data[key] / 10) * 10;
                }
                setEnergyCost(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Get the energy cost of each division for the last week and save it in an array from the database http://localhost:8080/smarthome/private/house/1/energy/month
    const [energyCostPerWeekDay, setEnergyCostPerWeekDay] = useState([]);
    const [energyCostPerDivision, setEnergyCostPerDivision] = useState([]);
    const [lastWeek, setLastWeek] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/house/${casaID}/energy/week`)
            .then((res) => {
                // res.data is an array of objects with the following structure:
                // {1: {1: 3232.4700000000003, 2: 1282.4700000000003,}, 2: {1: 3232.4700000000003, 2: 1282.4700000000003,}}
                // each object is a division and each division has an array of objects with the energy cost for each day
                // round the energy cost to units of 10W save the mean value of the energy cost for each day in an array and save the mean value of the energy cost for each division in an array
                let costPerDay = new Array(Object.keys(res.data[1]).length).fill(0);
                let costPerDivision = [];
                let lastW = [];
                for (const key in res.data) {
                    let sum = 0;
                    let count = 0;
                    for (const key2 in res.data[key]) {
                        let date = key2.split("T")[0];
                        if (!lastW.includes(date)) {
                            lastW.push(date);
                        }
                        let day = Math.round(res.data[key][key2] / 10) * 10;
                        costPerDay[count] += day;
                        sum += day;
                        count++;
                    }
                    costPerDivision.push(sum);
                }
                for (let i = 0; i < costPerDay.length; i++) {
                    costPerDay[i] = costPerDay[i] / Object.keys(res.data).length;
                }
                setEnergyCostPerWeekDay(costPerDay);
                setEnergyCostPerDivision(costPerDivision);
                setLastWeek(lastW.sort());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Get the energy cost of each division for the last month and save it in an array from the database http://localhost:8080/smarthome/private/house/1/energy/week
    const [energyCostPerDay, setEnergyCostPerDay] = useState([]);
    const [energyCostPerDivision2, setEnergyCostPerDivision2] = useState([]);
    const [lastMonth, setLastMonth] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/house/${casaID}/energy/month`)
            .then((res) => {
                // res.data is an array of objects with the following structure:
                // {1: {1: 3232.4700000000003, 2: 1282.4700000000003,}, 2: {1: 3232.4700000000003, 2: 1282.4700000000003,}}
                // round the energy cost to units of 10W and save the mean of the values in an array

                let costPerDay = new Array(Object.keys(res.data[1]).length).fill(0);
                let costPerDivision = [];
                let lastM = [];
                for (const key in res.data) {
                    let sum = 0;
                    let count = 0;
                    for (const key2 in res.data[key]) {
                        let date = key2.split("T")[0];
                        if (!lastM.includes(date)) {
                            lastM.push(date);
                        }
                        let day = Math.round(res.data[key][key2] / 10) * 10;
                        costPerDay[count] += day;
                        sum += day;
                        count++;
                    }
                    costPerDivision.push(sum);
                }
                for (let i = 0; i < costPerDay.length; i++) {
                    costPerDay[i] = costPerDay[i] / Object.keys(res.data).length;
                }
                setEnergyCostPerDay(costPerDay);
                setEnergyCostPerDivision2(costPerDivision);
                setLastMonth(lastM.sort());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Tab index for the home stats
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    // check if the user is logged in else redirect to the login page
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("userID") === null) {
            setIsLogged(false);
            window.location.href = "/login";
        } else {
            setIsLogged(true);
        }
    }, []);

    const handleDeleteDivision = (divID) => {
        axios
            .delete(`http://localhost:8080/smarthome/private/house/${casaID}/divisions`,
            {
                params: {
                    idDiv: divID,
                }
            })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
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
                                        route: `/division/${division.nome}`,
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
                        <Link to="/addDivision">
                            <MDButton variant="contained" color="primary" fullWidth>
                                Adicionar divisão
                            </MDButton>
                        </Link>
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
                                    data: energyCostPerDay,
                                }}
                                PieChartObject={{
                                    title: "Mês",
                                    description: "Gasto energético por divisão",
                                    labels: divisions.map((division) => division.nome),
                                    data: energyCostPerDivision2,
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
