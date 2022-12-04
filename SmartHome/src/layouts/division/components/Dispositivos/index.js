// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React Components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React Examples
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dispositivos Data
import energyChartData from "./data/energyChartData";

function DivisionDisp() {
    return (
        <>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Consumo Energético</MDTypography>
            </Grid>
            <Grid container mt={4} spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <VerticalBarChart
                        icon={energyChartData.icon}
                        title={energyChartData.title}
                        description={energyChartData.description}
                        chart={energyChartData.chart}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={2}
                            px={2}
                            variant="gradient"
                            bgColor="warning"
                            borderRadius="lg"
                            coloredShadow="warning"
                        >
                            <MDTypography variant="h6" color="white">
                                Informações do Consumo Energético
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={3}>
                            <MDBox bgColor="light" borderRadius="xl" px={0.5} py={0.5} mb={2}>
                                <ComplexStatisticsCard
                                    title="Previsão de Consumo na próxima hora"
                                    count="1000"
                                    icon="bolt"
                                    color="warning"
                                />
                            </MDBox>
                            <MDBox bgColor="light" borderRadius="xl" px={0.5} py={0.5} mb={2}>
                                <ComplexStatisticsCard
                                    title="Dispositivos Ligados"
                                    count="10"
                                    icon="power"
                                    color="dark"
                                />
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
            <Divider />
            <Grid container mt={4}>
                <Grid item xs={12} sm={12} md={6}>
                    <MDTypography variant="h2">Dispositivos Ligados</MDTypography>
                    <MDButton variant="gradient" color="primary" size="large">
                        <Icon>add</Icon>
                    </MDButton>
                </Grid>
            </Grid>
        </>
    );
}

export default DivisionDisp;
