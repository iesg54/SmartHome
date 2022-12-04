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

import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import divisionsData from "layouts/dashboard/data/divisionsData";

function Dashboard() {
    const { sales, tasks } = reportsLineChartData;
    const { divisions } = divisionsData;

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
                <MDBox mt={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart
                                    color="info"
                                    title="website views"
                                    description="Last Campaign Performance"
                                    date="campaign sent 2 days ago"
                                    chart={reportsBarChartData}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="daily sales"
                                    description={
                                        <>
                                            (<strong>+15%</strong>) increase in today sales.
                                        </>
                                    }
                                    date="updated 4 min ago"
                                    chart={sales}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="completed tasks"
                                    description="Last Campaign Performance"
                                    date="just updated"
                                    chart={tasks}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Dashboard;
