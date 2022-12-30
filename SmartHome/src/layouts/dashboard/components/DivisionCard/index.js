import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function DivisionCard({ image, name, energyConsumption, action, handleDeleteDiv }) {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: 1,
                boxShadow: 1,
                border: 0,
                bgcolor: "background.paper",
            }}
        >
            <MDBox
                sx={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                    borderRadius: 1,
                    bgcolor: "background.paper",
                }}
            >
                <img
                    src={image}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
                <MDBox
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        "&:hover": {
                            opacity: 1,
                        },
                    }}
                >
                    <MDTypography
                        variant="h4"
                        sx={{
                            color: "common.white",
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        {name}
                    </MDTypography>
                    <MDTypography
                        variant="h6"
                        sx={{
                            color: "common.white",
                            fontWeight: 400,
                        }}
                    >
                        <Icon
                            sx={{
                                fontSize: 16,
                                mr: 1,
                            }}
                        >
                            power
                        </Icon>
                        {energyConsumption} kWh
                    </MDTypography>
                    <MDBox
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 2,
                        }}
                    >
                        {action && (
                            <MDButton
                                variant="contained"
                                color={action.color}
                                size="small"
                                component={action.type === "external" ? MuiLink : Link}
                                to={action.route}
                                target={action.type === "external" ? "_blank" : ""}
                            >
                                <Icon
                                    sx={{
                                        fontSize: 16,
                                        mr: 1,
                                    }}
                                >
                                    {action.type === "external" ? "open_in_new" : "arrow_forward"}
                                </Icon>
                                {action.label}
                            </MDButton>
                        )}
                        <MDButton
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{
                                ml: 1,
                            }}
                            onClick={handleDeleteDiv}
                        >
                            <Icon
                                sx={{
                                    fontSize: 16,
                                    mr: 1,
                                }}
                            >
                                delete
                            </Icon>
                            Delete
                        </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>
        </Card>
    );
}

// Typechecking props for the SimpleBlogCard
DivisionCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    energyConsumption: PropTypes.number.isRequired,
    action: PropTypes.shape({
        type: PropTypes.oneOf(["external", "internal"]),
        route: PropTypes.string,
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "light",
            "default",
        ]),
        label: PropTypes.string,
    }),
    handleDeleteDiv: PropTypes.func,
};

DivisionCard.defaultProps = {
    action: false,
};

export default DivisionCard;
