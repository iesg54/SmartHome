// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function Footer({ light }) {
    const { size } = typography;

    return (
        <MDBox component="footer" variant={light ? "transparent" : "dark"} py={3}>
            <Container maxWidth="lg">
                <MDBox display="flex" justifyContent="space-between" alignItems="center">
                    <MDTypography variant="caption" fontSize={size.sm}>
                        <Link href="https://www.ua.pt/" target="_blank" rel="noreferrer">
                            Universidade de Aveiro
                        </Link>
                        &nbsp;|&nbsp; 2022 - 2023 IES Project - Grupo 54
                    </MDTypography>
                </MDBox>
            </Container>
        </MDBox>
    );
}

// Setting default props for the Footer
Footer.defaultProps = {
    light: false,
};

// Typechecking props for the Footer
Footer.propTypes = {
    light: PropTypes.bool,
};

export default Footer;
