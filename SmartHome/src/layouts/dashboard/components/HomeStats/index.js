// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PieChart from "examples/Charts/PieChart";

function HomeStats({
    titleline,
    titlepie,
    descriptionline,
    descriptionpie,
    dataline,
    datapie,
    xline,
    labelspie,
}) {
    return (
        <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6} md={8}>
                <DefaultLineChart
                    icon={{ color: "info", component: "wallet" }}
                    title={titleline}
                    description={descriptionline}
                    chart={{
                        labels: xline,
                        datasets: [
                            {
                                label: "Gastos",
                                color: "info",
                                data: dataline,
                            },
                        ],
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <PieChart
                    icon={{ color: "info", component: "wallet" }}
                    title={titlepie}
                    description={descriptionpie}
                    chart={{
                        labels: labelspie,
                        datasets: {
                            label: "Gastos",
                            backgroundColors: ["primary", "secondary", "warning", "dark"],
                            data: datapie,
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
}

HomeStats.defaultProps = {
    titleline: "",
    titlepie: "",
    descriptionline: "",
    descriptionpie: "",
    dataline: [],
    datapie: [],
    xline: [],
    labelspie: [],
};

HomeStats.propTypes = {
    titleline: PropTypes.string,
    titlepie: PropTypes.string,
    descriptionline: PropTypes.string,
    descriptionpie: PropTypes.string,
    dataline: PropTypes.arrayOf(PropTypes.number),
    datapie: PropTypes.arrayOf(PropTypes.number),
    xline: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    labelspie: PropTypes.arrayOf(PropTypes.string),
};

export default HomeStats;
