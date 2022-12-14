// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function DeviceCard({
    color,
    name,
    state,
    icon,
    consumption,
    deviceStateHandler,
    deviceActionHandler,
}) {
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
            <MDBox display="flex" justifyContent="space-between" px={2} pb={2}>
                <MDBox display="flex" alignItems="center">
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={deviceStateHandler} checked={state} />} label={state ? "Ligado" : "Desligado"} />
                    </FormGroup>
                    <MDButton variant="gradient" color={color} onClick={deviceActionHandler} circular>
                        <Icon fontSize="small">settings</Icon>
                    </MDButton>
                </MDBox>
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
    deviceActionHandler: PropTypes.func.isRequired,
};

export default DeviceCard;
