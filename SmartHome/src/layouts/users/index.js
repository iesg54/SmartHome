import * as React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import usersData from "layouts/users/data/usersData";

// components
import UserCard from "layouts/users/components/UserCard";

// Others
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    email: yup.string().email("Email is not valid!").required("Please add an email!"),
    tipo: yup.string().required("Please select a type!"),
});

function Users() {
    const { users } = usersData;
    const [showForm, toggleForm] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            tipo: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
        },
        cleanForm: true,
    });

    const handleClick = (e) => {
        e.preventDefault();
        toggleForm((prevValue) => !prevValue);
    };

    const name = "selectedOption";

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center" mb={4}>
                <MDTypography variant="h2">Utilizadores associados à Casa</MDTypography>
            </Grid>
            <Grid container spacing={5} justifyContent="center">
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={3} key={user.id}>
                        <MDBox mb={3}>
                            <UserCard nome={user.name} isAdmin={user.isAdmin} />
                        </MDBox>
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" mb={3}>
                <MDButton variant="contained" color="primary" size="small" onClick={handleClick}>
                    {showForm ? "Cancelar" : "Adicionar Utilizador"}
                </MDButton>
            </Grid>
            {showForm && (
                <Grid container justifyContent="center">
                    <MDTypography variant="h3" mb={2}>
                        Novo Utilizador
                    </MDTypography>
                    <Grid container justifyContent="center">
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={12} sm={12} md={12} mb={2}>
                                <MDTypography variant="h5">Email</MDTypography>
                                <MDInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mb={2}>
                                <FormControl
                                    component="fieldset"
                                    error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                                >
                                    <MDTypography variant="h5">Tipo</MDTypography>
                                    <RadioGroup
                                        aria-label="tipo"
                                        name="tipo"
                                        value={formik.values.tipo}
                                        onChange={formik.handleChange}
                                    >
                                        <FormControlLabel
                                            value="admin"
                                            control={<Radio />}
                                            label="Administrador"
                                        />
                                        <FormControlLabel
                                            value="user"
                                            control={<Radio />}
                                            label="Utilizador"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid container justifyContent="center" mb={3}>
                                <MDButton
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    type="submit"
                                    fullWidth
                                >
                                    Convidar
                                </MDButton>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            )}
            <Footer />
        </DashboardLayout>
    );
}

export default Users;
