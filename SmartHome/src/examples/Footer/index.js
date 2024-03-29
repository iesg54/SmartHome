/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function Footer({ company }) {
    const { href, name } = company;
    const { size } = typography;

    return (
        <MDBox
            width="100%"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="center"
            px={1.5}
        >
            <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                color="text"
                fontSize={size.sm}
                px={1.5}
            >
                SmartHome Project 2022/2023 made by
                <Link href={href} target="_blank">
                    <MDTypography variant="button" fontWeight="medium">
                        &nbsp;{name}&nbsp;
                    </MDTypography>
                </Link>
                for
                <Link href="https://www.ua.pt/" target="_blank">
                    <MDTypography variant="button" fontWeight="medium">
                        &nbsp;Universidade de Aveiro&nbsp;
                    </MDTypography>
                </Link>
            </MDBox>
            <MDBox
                component="ul"
                sx={({ breakpoints }) => ({
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    listStyle: "none",
                    mt: 3,
                    mb: 0,
                    p: 0,

                    [breakpoints.up("lg")]: {
                        mt: 0,
                    },
                })}
            ></MDBox>
        </MDBox>
    );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
    company: { href: "https://github.com/iesg54/IES_Proj_G54", name: "IES G54" },
};

// Typechecking props for the Footer
Footer.propTypes = {
    company: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
