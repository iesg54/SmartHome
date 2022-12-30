// React
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// other imports
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
    name: Yup.string().required("Please add a name!"),
    email: Yup.string().email("Please add a valid email!").required("Please add an email!"),
    password: Yup.string().required("Please add a password!"),
    userType: Yup.string().required("Please select a user type!"),
});

function Cover() {
    const [responseMessage, setResponseMessage] = useState({ type: "", message: "" });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            userType: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            axios
                .post("http://localhost:8080/smarthome/public/register", null, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        isAdmin: values.userType === "admin" ? true : false,
                    },
                })
                .then((res) => {
                    setResponseMessage({
                        type: "success",
                        message: res.data.message,
                    });
                    resetForm();
                })
                .catch((error) => {
                    setResponseMessage({
                        type: "error",
                        message: error.response.data.message,
                    });
                    resetForm();
                });
        },
    });

    return (
        <CoverLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    p={3}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Join us today!
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox mb={3}>
                        <MDTypography variant="h5" fontWeight="medium">
                            Sign up
                        </MDTypography>
                        <MDTypography variant="body2" color="textSecondary">
                            Already have an account?{" "}
                            <Link to="/login" className="text-info">
                                Sign in
                            </Link>
                        </MDTypography>
                    </MDBox>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MDInput
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MDInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MDInput
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    component="fieldset"
                                    error={
                                        formik.touched.userType && Boolean(formik.errors.userType)
                                    }
                                >
                                    <FormLabel component="legend">User Type</FormLabel>
                                    <RadioGroup
                                        aria-label="userType"
                                        name="userType"
                                        value={formik.values.userType}
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
                                    <FormHelperText>
                                        {formik.touched.userType && formik.errors.userType}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <MDButton type="submit" variant="contained" color="info" fullWidth>
                                    Sign up
                                </MDButton>
                            </Grid>
                        </Grid>
                    </form>
                    {responseMessage.message !== "" && (
                        <MDAlert color={responseMessage.type} mt={2}>
                            {responseMessage.message}
                        </MDAlert>
                    )}
                </MDBox>
            </Card>
        </CoverLayout>
    );
}

export default Cover;
