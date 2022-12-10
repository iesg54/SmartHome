// react
import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

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
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const getUserData = (values) => {
        axios
            .get(
                `http://localhost:8080/smarthome/public/login?email=${values.email}&password=${values.password}`
            )
            .then((res) => {
                setUserData(res.data);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 401:
                        setErrorMessage("Password incorreta!");
                        break;
                    case 404:
                        setErrorMessage("Email não encontrado!");
                        break;
                    default:
                        setErrorMessage("Erro desconhecido!");
                }
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

    useEffect(() => {
        if (userData.id) {
            localStorage.setItem("userID", userData.id);
            localStorage.setItem("CasaID", userData.casa.id);
            window.location.href = "/dashboard";
        }
    }, [userData]);

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
                            <MDTypography variant="body2" color="error" textAlign="center">
                                {errorMessage}
                            </MDTypography>
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
                            <Link to="/authentication/sign-up">Sign up</Link>
                        </MDTypography>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default Basic;
