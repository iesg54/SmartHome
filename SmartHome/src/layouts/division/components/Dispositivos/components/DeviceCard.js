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
            <MDBox p={2}>
                <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" alignItems="center">
                        <MDBox
                            variant="gradient"
                            bgColor={color === "light" ? "dark" : "white"}
                            borderRadius="md"
                            coloredShadow={color}
                            p={1}
                            mr={2}
                        >
                            <Icon color="inherit">{icon}</Icon>
                        </MDBox>
                        <MDTypography variant="h6" fontWeight="medium">
                            {name}
                        </MDTypography>
                    </MDBox>
                    <MDBox display="flex" alignItems="center">
                        <MDTypography variant="h6" fontWeight="medium">
                            {consumption} W
                        </MDTypography>
                    </MDBox>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" alignItems="center">
                        <MDTypography variant="h6" fontWeight="medium">
                            Estado
                        </MDTypography>
                    </MDBox>
                    <MDBox display="flex" alignItems="center">
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
                <MDBox display="flex" justifyContent="space-between" mt={2}>
                    <MDBox display="flex" alignItems="center">
                        <MDButton
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={deviceActionHandler}
                        >
                            Ações
                        </MDButton>
                    </MDBox>
                    <MDBox display="flex" alignItems="center">
                        <MDButton
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={deviceDeleteHandler}
                        >
                            Excluir
                        </MDButton>
                    </MDBox>
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
