import * as React from "react";
import { useState, useEffect } from "react";

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
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// Data
import divisionsData from "layouts/dashboard/data/divisionsData";
import { monthlyEnergyCostData, yearlyEnergyCostData } from "./data/homeEnergyCostData";
import { monthlyDivisionStats, yearlyDivisionStats } from "./data/divisionStatsData";

// Components
import HomeStats from "./components/HomeStats";

function Dashboard() {
    const { divisions } = divisionsData;

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
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
                                <SimpleBlogCard
                                    image="https://bit.ly/3Hlw1MQ"
                                    title={division.name}
                                    description="800W"
                                    action={{
                                        type: "internal",
                                        route: `/division/${division.name}`,
                                        color: "dark",
                                        label: "Ver divisão",
                                    }}
                                />
                            </MDBox>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <MDButton variant="contained" color="primary" fullWidth>
                            Adicionar divisão
                        </MDButton>
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
                                <Tab label="Mês" />
                                <Tab label="Ano" />
                            </Tabs>
                        </Grid>
                    </Grid>
                    <Grid container mb={4}>
                        {tabIndex === 0 && (
                            <HomeStats
                                titleline={monthlyEnergyCostData.title}
                                titlepie={monthlyDivisionStats.title}
                                descriptionline={monthlyEnergyCostData.description}
                                descriptionpie={monthlyDivisionStats.description}
                                dataline={monthlyEnergyCostData.data}
                                datapie={monthlyDivisionStats.data}
                                xline={monthlyEnergyCostData.x}
                                labelspie={monthlyDivisionStats.labels}
                            />
                        )}
                        {tabIndex === 1 && (
                            <HomeStats
                                titleline={yearlyEnergyCostData.title}
                                titlepie={yearlyDivisionStats.title}
                                descriptionline={yearlyEnergyCostData.description}
                                descriptionpie={yearlyDivisionStats.description}
                                dataline={yearlyEnergyCostData.data}
                                datapie={yearlyDivisionStats.data}
                                xline={yearlyEnergyCostData.x}
                                labelspie={yearlyDivisionStats.labels}
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
