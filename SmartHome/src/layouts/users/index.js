import * as React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// components
import UserCard from "layouts/users/components/UserCard";

// Others
import { useFormik } from "formik";
import * as yup from "yup";

// Data
import usersData from "layouts/users/data/usersData";

// Axios
import axios from "axios";

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
        validationSchema,
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
            <Grid container justifyContent="center" mb={4}>
                <MDButton variant="contained" color="primary" onClick={handleClick}>
                    Adicionar Utilizador
                </MDButton>
            </Grid>
            {showForm && (
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <Grid container justifyContent="center" mb={3}>
                                <MDBox p={3}>
                                    <MDTypography variant="h4" mb={3}>
                                        Adicionar Utilizador
                                    </MDTypography>
                                    <form onSubmit={formik.handleSubmit}>
                                        <MDBox mb={3}>
                                            <MDInput
                                                id="email"
                                                name="email"
                                                label="Email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.email &&
                                                    Boolean(formik.errors.email)
                                                }
                                                helperText={
                                                    formik.touched.email && formik.errors.email
                                                }
                                                fullWidth
                                            />
                                        </MDBox>
                                        <MDBox mb={3}>
                                            <MDTypography variant="h6" mb={2}>
                                                Tipo de Utilizador
                                            </MDTypography>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    row
                                                    aria-label="tipo"
                                                    name="tipo"
                                                    value={formik.values.tipo}
                                                    onChange={formik.handleChange}
                                                >
                                                    <FormControlLabel
                                                        value="admin"
                                                        control={<Radio />}
                                                        label="Admin"
                                                    />
                                                    <FormControlLabel
                                                        value="user"
                                                        control={<Radio />}
                                                        label="User"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox mt={3} display="flex" justifyContent="space-between">
                                            <MDButton
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                type="submit"
                                            >
                                                Adicionar
                                            </MDButton>
                                            <MDButton
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={handleClick}
                                            >
                                                Cancelar
                                            </MDButton>
                                        </MDBox>
                                    </form>
                                </MDBox>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            )}
            <Footer />
        </DashboardLayout>
    );
}

export default Users;
