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
import MDAlert from "components/MDAlert";

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

import { getUserInfo, getHouseUsers } from "appServices";

const validationSchema = yup.object({
    email: yup.string().email("Email is not valid!").required("Please add an email!"),
    tipo: yup.string().required("Please select a type!"),
});

function Users() {
    const token = localStorage.getItem("token");
    const [showForm, toggleForm] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        toggleForm((prevValue) => !prevValue);
    };

    const [responseMessage, setResponseMessage] = useState({ type: "", message: "" });
    const formik = useFormik({
        initialValues: {
            email: "",
            tipo: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            setDeleteUserMessage("");
            axios
                .post("http://localhost:8080/smarthome/private/house/1/users", null, {
                    params: {
                        email: values.email,
                    },
                })
                .then((response) => {
                    setResponseMessage({ type: "success", message: response.data.message });
                })
                .catch((error) => {
                    setResponseMessage({ type: "error", message: error.response.data.message });
                });
            resetForm();
            users.push(values);
        },
        cleanForm: true,
    });

    const [userData, setUserData] = useState({});
    const [users, setUsers] = useState([]);
    useEffect(async () => {
        const userInfo = await getUserInfo();
        setUserData(userInfo);
        const houseUsers = await getHouseUsers(userInfo.casa.id);
        setUsers(houseUsers);
    }, []);

    // Implement Method to delete user http://localhost:8080/smarthome/private/house/{houseID}/users
    const [deleteUserMessage, setDeleteUserMessage] = useState("");
    const handleDelete = (id) => {
        setDeleteUserMessage("");
        let user = users.find((user) => user.id === id);
        axios
            .delete(`http://localhost:8080/smarthome/private/house/${userData.casa.id}/users`, {
                params: {
                    email: user.email,
                },
            })
            .then((response) => {
                setDeleteUserMessage(response.data.message);
            });
        users.splice(users.indexOf(user), 1);
    };

    // check if the user is an admin
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    useEffect(() => {
        users.forEach((user) => {
            if (user.id === Number(localStorage.getItem("userID")) && user.admin === true) {
                setIsUserAdmin(true);
            }
        });
    }, [users]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Grid container justifyContent="center" mb={4}>
                    <MDTypography variant="h2">Utilizadores associados à Casa</MDTypography>
                </Grid>
                {deleteUserMessage && (
                    <Grid container justifyContent="center" mb={4}>
                        <MDAlert color="primary" dismissible>
                            {deleteUserMessage}
                        </MDAlert>
                    </Grid>
                )}
                <Grid container spacing={5} justifyContent="center">
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={3} key={user.id}>
                            <MDBox mb={3}>
                                <UserCard
                                    nome={user.nome}
                                    isAdmin={user.admin}
                                    foto={user.profileImage ? user.profileImage : ""}
                                    id={user.id}
                                    handleDelete={(e) => handleDelete(user.id)}
                                    userID={userData.id}
                                />
                            </MDBox>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center" mb={4}>
                    {!showForm && isUserAdmin && (
                        <MDButton variant="contained" color="primary" onClick={handleClick}>
                            Adicionar Utilizador
                        </MDButton>
                    )}
                </Grid>
                {responseMessage.message && (
                    <Grid container justifyContent="center" mb={4}>
                        <MDAlert color={responseMessage.type} dismissible>
                            {responseMessage.message}
                        </MDAlert>
                    </Grid>
                )}
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
                                            <MDBox
                                                mt={3}
                                                display="flex"
                                                justifyContent="space-between"
                                            >
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
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Users;
