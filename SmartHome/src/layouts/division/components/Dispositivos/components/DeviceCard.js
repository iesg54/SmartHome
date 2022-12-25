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
    deviceDeleteHandler,
}) {
    return (
        <Card>
            <MDBox display="flex" flexDirection="column" alignItems="center" p={2}>
                <MDBox display="flex" alignItems="center">
                    <MDBox
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={50}
                        height={50}
                        borderRadius="50%"
                        bgcolor={color}
                        color={color === "light" ? "white" : "dark"}
                        variant="gradient"
                        coloredShadow={color}
                        mr={2}
                    >
                        <Icon fontSize="medium" color="inherit">{icon}</Icon>
                    </MDBox>
                    <MDTypography variant="h5" mt={2}>
                        {name}
                    </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center" mt={2}>
                    <MDTypography variant="body2" color="secondary">
                        Consumo: {consumption} W
                    </MDTypography>
                </MDBox>
                <MDBox display="flex" alignItems="center" mt={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state}
                                    onChange={deviceStateHandler}
                                    name="state"
                                />
                            }
                            label={state ? "Ligado" : "Desligado"}
                        />
                    </FormGroup>
                </MDBox>
            </MDBox>
            <Divider />
            <MDBox display="flex" justifyContent="center" mt={2} mb={3}>
                <MDBox display="flex" alignItems="center" ml={2}>
                    <MDButton
                        variant="contained"
                        color="primary"
                        onClick={deviceActionHandler}
                    >
                        Ação
                    </MDButton>
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={2}>
                    <MDButton
                        variant="contained"
                        color="error"
                        onClick={deviceDeleteHandler}
                    >
                        Excluir
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
    deviceDeleteHandler: PropTypes.func.isRequired,
};

export default DeviceCard;
