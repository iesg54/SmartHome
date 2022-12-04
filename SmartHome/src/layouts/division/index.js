import * as React from "react";

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

// Divion Coponents
import DivionStats from "layouts/division/components/Stats";
import DivisionDisp from "layouts/division/components/Dispositivos";

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
                <Grid container mb={4}>
                    {tabIndex === 0 && <DivionStats />}
                    {tabIndex === 1 && <DivisionDisp />}
                </Grid>
            </MDBox>
            <Divider />
            <Footer />
        </DashboardLayout>
    );
}

export default Division;
