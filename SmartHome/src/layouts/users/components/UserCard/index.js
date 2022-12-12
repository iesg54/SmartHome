// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function UserCard({ nome, foto, isAdmin }) {
    return (
        <Card>
            <MDBox display="flex" alignItems="center" p={3}>
                <MDBox mr={3}>
                    <MDAvatar src={foto} alt="User" size="lg" shadow="md" bgColor="dark" />
                </MDBox>
                <MDBox>
                    <MDTypography variant="h5" fontWeight="bold">
                        {nome}
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                        {isAdmin ? "Administrador" : "Convidado"}
                    </MDTypography>
                </MDBox>
            </MDBox>
            <MDBox display="flex" justifyContent="center" mb={3}>
                <MDButton variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                    Editar
                </MDButton>
                <MDButton variant="outlined" color="primary" size="small">
                    Excluir
                </MDButton>
            </MDBox>
        </Card>
    );
}

UserCard.defaultProps = {
    nome: "João Silva",
    foto: "https://bit.ly/34BY10g",
    isAdmin: true,
};

UserCard.propTypes = {
    nome: PropTypes.string.isRequired,
    foto: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default UserCard;
