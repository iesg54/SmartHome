// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function UserCard({ nome, foto, isAdmin, id, handleDelete, userID }) {
    return (
        <Card>
            <MDBox display="flex" flexDirection="column" alignItems="center" p={2}>
                <MDAvatar
                    src={foto}
                    alt="ProfilePicture"
                    sx={{ width: 100, height: 100 }}
                    bgColor="dark"
                />
                <MDTypography variant="h5" mt={2}>
                    {nome}
                </MDTypography>
                <MDTypography variant="body2" color="secondary">
                    {isAdmin ? "Administrador" : "Utilizador"}
                </MDTypography>
            </MDBox>
            <MDBox display="flex" justifyContent="center" mt={2} mb={3}>
                {userID !== id && !isAdmin ? (
                    <MDButton
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Icon>delete</Icon>}
                        onClick={handleDelete}
                    >
                        Remover
                    </MDButton>
                ) : (
                    <MDButton
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Icon>delete</Icon>}
                        onClick={handleDelete}
                        disabled
                    >
                        Remover
                    </MDButton>
                )}
            </MDBox>
        </Card>
    );
}

UserCard.propTypes = {
    nome: PropTypes.string.isRequired,
    foto: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    userID: PropTypes.number.isRequired,
};

export default UserCard;
