import * as React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// Data
import usersData from "layouts/users/data/usersData";

// Others
import { Formik, Form } from "formik";
import * as yup from "yup";

function Users() {
    const { users } = usersData;
    const [showForm, toggleForm] = React.useState(false);

    const validate = yup.object().shape({
        email: yup.string().email("Email is not valid!").required("Please add an email!"),
    });

    const handleClick = (e) => {
        e.preventDefault();
        toggleForm((prevValue) => !prevValue);
    };

    const name = "selectedOption";

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container justifyContent="center" mb={6}>
                    <MDTypography variant="h2">Utilizadores associados à Casa</MDTypography>
                </Grid>
                <Grid container spacing={5} justifyContent="center">
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={3} key={user.id}>
                            <MDBox mb={3}>
                                <SimpleBlogCard
                                    image="https://bit.ly/3Hlw1MQ"
                                    title={user.name}
                                    description={user.isAdmin ? "Admin" : "Utilizador Normal"}
                                />
                            </MDBox>
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={6} md={3}>
                        <MDBox mb={3}>
                            <div onClick={handleClick}>
                                <SimpleBlogCard
                                    image="https://bit.ly/3Hlw1MQ"
                                    title="Adicionar novo utilizador"
                                    description="Associe um novo utilizador à Casa"
                                />
                            </div>
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox py={3}>
                {showForm && (
                    <Grid container justifyContent="center" mb={6}>
                        <MDTypography variant="h3" mb={4}>
                            Novo Utilizador
                        </MDTypography>
                        <Grid container justifyContent="center" mb={6}>
                            <MDBox mb={3}>
                                <Formik
                                    validationSchema={validate}
                                    onSubmit={(values, { resetForm }) => {
                                        console.log(values);
                                        resetForm;
                                    }}
                                    initialValues={{
                                        email: "",
                                        selectedOption: "Admin",
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        values,
                                        touched,
                                        errors,
                                        resetForm,
                                        setFieldValue,
                                    }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Grid container justifyContent="center" mb={6}>
                                                <TextField
                                                    id="email"
                                                    name="email"
                                                    label="Email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    error={touched.email && Boolean(errors.email)}
                                                    helperText={touched.email && errors.email}
                                                />
                                            </Grid>
                                            <Grid container justifyContent="center" mb={6}>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">
                                                        <MDTypography variant="p">
                                                            Privilégios do Utilizador
                                                        </MDTypography>
                                                    </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name={name}
                                                        value={values.selectedOption}
                                                        onChange={(event) => {
                                                            setFieldValue(
                                                                name,
                                                                event.currentTarget.value
                                                            );
                                                        }}
                                                    >
                                                        <Grid
                                                            container
                                                            justifyContent="center"
                                                            mb={6}
                                                        >
                                                            <FormControlLabel
                                                                value="Admin"
                                                                control={<Radio />}
                                                                label="Admin"
                                                            />
                                                            <FormControlLabel
                                                                value="Normal"
                                                                control={<Radio />}
                                                                label="Normal"
                                                            />
                                                        </Grid>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid container justifyContent="center" mb={6}>
                                                <MDBox mr={2}>
                                                    <MDButton
                                                        variant="outlined"
                                                        color="error"
                                                        type="reset"
                                                        onClick={handleClick}
                                                    >
                                                        Cancelar
                                                    </MDButton>
                                                </MDBox>
                                                <MDBox>
                                                    <Button
                                                        color="success"
                                                        variant="contained"
                                                        type="submit"
                                                    >
                                                        {" "}
                                                        Submit{" "}
                                                    </Button>
                                                </MDBox>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </MDBox>
                        </Grid>
                    </Grid>
                )}
            </MDBox>
            <Divider />
            <Footer />
        </DashboardLayout>
    );
}

export default Users;
