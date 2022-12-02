import * as React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Division() {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container justifyContent="center" mb={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Tabs value={tabIndex} onChange={handleTabChange}>
                            <Tab label="Estatísticas" />
                            <Tab label="Dispositivos" />
                        </Tabs>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" mb={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        {tabIndex === 0 && <MDTypography variant="h2">Estatísticas</MDTypography>}
                        {tabIndex === 1 && <MDTypography variant="h2">Dispositivos</MDTypography>}
                    </Grid>
                </Grid>
            </MDBox>
            <Divider />
            <Footer />
        </DashboardLayout>
    );
}

export default Division;
