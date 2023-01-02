// react
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// other imports
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
    email: Yup.string().email("Please add a valid email!").required("Please add an email!"),
    password: Yup.string().required("Please add a password!"),
});

function Basic() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const getUserData = (values) => {
        axios
            .post(
                "http://192.168.160.238:8080/smarthome/public/login",
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                localStorage.setItem("token", res.data.jwttoken);
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            getUserData(values);
        },
    });

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Sign in
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox mb={3}>
                        <MDInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                    </MDBox>
                    <MDBox mb={3}>
                        <MDInput
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />
                    </MDBox>
                    {errorMessage && (
                        <MDBox mb={3}>
                            <MDAlert color="error" fontSize="small" dismissible>
                                {errorMessage}
                            </MDAlert>
                        </MDBox>
                    )}
                    <MDBox mb={3}>
                        <MDButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            onClick={formik.handleSubmit}
                        >
                            Sign in
                        </MDButton>
                    </MDBox>
                    <MDBox mb={3}>
                        <MDTypography variant="body2" color="secondary" textAlign="center">
                            Don&apos;t have an account?&nbsp;
                            <Link to="/register">Sign up</Link>
                        </MDTypography>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default Basic;
