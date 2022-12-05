import React from "react";

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
import devices from "./data/devicesData";

// Dispositivos Component
import DeviceCard from "./components/DeviceCard";

function DivisionDevices() {
    const [devicesState, setDevicesState] = React.useState(devices);

    /* eslint-disable no-param-reassign */
    const handleDeviceState = (id) => {
        const newDevicesState = devicesState.map((device) => {
            if (device.id === id) {
                device.state = !device.state;
            }
            return device;
        });
        setDevicesState(newDevicesState);
    };
    /* eslint-disable no-param-reassign */

    return (
        <>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Consumo Energético</MDTypography>
            </Grid>
            <Grid container mt={4} spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <VerticalBarChart
                        icon={energyChartData.icon}
                        title={energyChartData.title}
                        description={energyChartData.description}
                        chart={energyChartData.chart}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
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
                                    count={devices
                                        .filter((device) => device.state)
                                        .map((device) => device.consumption)
                                        .reduce((a, b) => a + b, 0)}
                                    icon="bolt"
                                    color="warning"
                                />
                            </MDBox>
                            <MDBox bgColor="light" borderRadius="xl" px={0.5} py={0.5} mb={2}>
                                <ComplexStatisticsCard
                                    title="Dispositivos Ligados"
                                    count={devicesState.filter((device) => device.state).length}
                                    icon="power"
                                    color="dark"
                                />
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
            <Divider />
            <Grid container mt={4} spacing={2}>
                <Grid item>
                    <MDTypography variant="h2">Dispositivos Ligados</MDTypography>
                </Grid>
                <Grid item>
                    <MDButton variant="gradient" color="primary" size="large">
                        <Icon>add</Icon>
                    </MDButton>
                </Grid>
            </Grid>
            <Grid container mt={4} spacing={3}>
                {devices.map((device) => (
                    <Grid item xs={12} sm={12} md={3} key={device.id}>
                        <DeviceCard
                            color="dark"
                            icon={device.icon}
                            type={device.type}
                            name={device.name}
                            state={device.state}
                            consumption={device.consumption}
                            deviceStateHandler={() => handleDeviceState(device.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default DivisionDevices;
