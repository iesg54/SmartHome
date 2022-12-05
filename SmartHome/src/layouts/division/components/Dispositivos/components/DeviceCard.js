// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DeviceCard({ color, name, state, icon, consumption, deviceStateHandler }) {
    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                <MDBox
                    variant="gradient"
                    bgColor={color}
                    color={color === "light" ? "dark" : "white"}
                    coloredShadow={color}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                >
                    <Icon fontSize="medium" color="inherit">
                        {icon}
                    </Icon>
                </MDBox>
                <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="h4">{name}</MDTypography>
                    <MDTypography variant="button" fontWeight="light" color="text">
                        {consumption}
                    </MDTypography>
                </MDBox>
            </MDBox>
            <Divider />
            <MDBox pb={2} px={2}>
                {state ? (
                    <MDTypography variant="h6" color="success">
                        Ligado
                    </MDTypography>
                ) : (
                    <MDTypography variant="h6" color="error">
                        Desligado
                    </MDTypography>
                )}
                <Switch onChange={deviceStateHandler} checked={state} />
            </MDBox>
        </Card>
    );
}

// Setting default values for the props of ComplexStatisticsCard
DeviceCard.defaultProps = {
    color: "info",
    consumption: 0,
};

// Typechecking props for the ComplexStatisticsCard
DeviceCard.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    state: PropTypes.bool.isRequired,
    deviceStateHandler: PropTypes.func.isRequired,
    consumption: PropTypes.number,
};

export default DeviceCard;
