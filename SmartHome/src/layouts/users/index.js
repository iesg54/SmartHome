import * as React from "react";
import { useState, useEffect } from "react";

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

// Axios
import axios from "axios";

const validationSchema = yup.object({
    email: yup.string().email("Email is not valid!").required("Please add an email!"),
    tipo: yup.string().required("Please select a type!"),
});

function Users() {
    const [showForm, toggleForm] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            tipo: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            // Send data to the API http://localhost:8080/smarthome/private/house/{houseID}/users
            axios
                .post("http://localhost:8080/smarthome/private/house/1/users", null, {
                    params: {
                        email: values.email,
                    },
                })
                .then((response) => {
                    console.log(response);
                    setResponseMessage(response.data.message);
                })
                .catch((error) => {
                    console.log(error);
                });

            resetForm();
        },
        cleanForm: true,
    });

    const handleClick = (e) => {
        e.preventDefault();
        toggleForm((prevValue) => !prevValue);
    };

    // Get Users Data from the API and update the state http://localhost:8080/smarthome/private/house/{houseID}/users
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/smarthome/private/house/1/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                            <UserCard
                                nome={user.nome}
                                isAdmin={user.admin}
                                foto={user.profileImage}
                            />
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
                                {responseMessage && (
                                    <MDBox p={3}>
                                        <MDTypography variant="h5" color="primary">
                                            {responseMessage}
                                        </MDTypography>
                                    </MDBox>
                                )}
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
