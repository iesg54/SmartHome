// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React Examples
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React Components
import MDTypography from "components/MDTypography";

// Sensors Data
import sensorsData from "layouts/division/components/Stats/data/sensorsData";
import sensorsChartData from "./data/sensorsChartData";
import alertsTableData from "./data/alertsTableData";

function DivisionStats() {
    return (
        <>
            <Grid container spacing={3} justifyContent="center" mt={2}>
                {sensorsData.map((sensor) => (
                    <Grid item xs={12} sm={6} md={3.5} key={sensor.id}>
                        <ComplexStatisticsCard
                            title={sensor.name}
                            count={sensor.value}
                            icon={sensor.icon}
                            color={sensor.color}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Sensores ao longo do tempo</MDTypography>
            </Grid>
            <Grid container justifyContent="center" mt={2} spacing={3}>
                {sensorsChartData.map((sensor) => (
                    <Grid item xs={12} sm={12} md={4} key={sensor.id}>
                        <DefaultLineChart
                            icon={sensor.icon}
                            title={sensor.title}
                            description={sensor.description}
                            chart={sensor.chart}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Registo de Alertas</MDTypography>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
                <DataTable
                    tableHeaderColor="primary"
                    table={{
                        columns: [
                            {
                                Header: "sensor",
                                accessor: "sensor",
                                width: 100,
                            },
                            {
                                Header: "mensagem",
                                accessor: "mensagem",
                                width: 100,
                            },
                            {
                                Header: "valor",
                                accessor: "valor",
                                width: 100,
                            },
                            {
                                Header: "timestamp",
                                accessor: "timestamp",
                                width: 100,
                            },
                        ],
                        rows: alertsTableData,
                    }}
                />
            </Grid>
        </>
    );
}

export default DivisionStats;
