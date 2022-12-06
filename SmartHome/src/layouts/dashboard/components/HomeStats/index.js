// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

function HomeStats({ title, description, data, x }) {
    return (
        <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6} md={8}>
                <DefaultLineChart
                    icon={{ color: "info", component: "wallet" }}
                    title={title}
                    description={description}
                    chart={{
                        labels: x,
                        datasets: [
                            {
                                label: "Gastos",
                                color: "info",
                                data,
                            },
                        ],
                    }}
                />
            </Grid>
        </Grid>
    );
}

HomeStats.defaultProps = {
    title: "",
    description: "",
    data: [],
    x: [],
};

HomeStats.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number),
    x: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default HomeStats;
