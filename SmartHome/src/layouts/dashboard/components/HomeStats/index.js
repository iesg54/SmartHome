// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PieChart from "examples/Charts/PieChart";

function HomeStats({ LineChartObject, PieChartObject }) {
    return (
        <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6} md={8}>
                <DefaultLineChart
                    icon={{ color: "info", component: "wallet" }}
                    title={LineChartObject.title}
                    description={LineChartObject.description}
                    chart={{
                        labels: LineChartObject.labels,
                        datasets: [
                            {
                                label: "Gastos",
                                color: "info",
                                data: LineChartObject.data,
                            },
                        ],
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <PieChart
                    icon={{ color: "info", component: "wallet" }}
                    title={PieChartObject.title}
                    description={PieChartObject.description}
                    chart={{
                        labels: PieChartObject.labels,
                        datasets: {
                            label: "Gastos",
                            backgroundColors: [
                                "primary",
                                "secondary",
                                "warning",
                                "dark",
                                "info",
                                "success",
                                "error",
                            ],
                            data: PieChartObject.data,
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
}

HomeStats.defaultProps = {
    LineChartObject: {
        title: "Semana",
        description: "Gasto energético semanal",
        labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
        data: [0, 0, 0, 0, 0, 0, 0],
    },
    PieChartObject: {
        title: "Semana",
        description: "Gasto energético por divisão",
        labels: ["Divisão 1", "Divisão 2", "Divisão 3", "Divisão 4"],
        data: [0, 0, 0, 0],
    },
};

HomeStats.propTypes = {
    LineChartObject: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.string),
        data: PropTypes.arrayOf(PropTypes.number),
    }),
    PieChartObject: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.string),
        data: PropTypes.arrayOf(PropTypes.number),
    }),
};

export default HomeStats;
