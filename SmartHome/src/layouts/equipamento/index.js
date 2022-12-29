import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Others
import { useFormik } from "formik";
import * as yup from "yup";

// Axios
import axios from "axios";

const validationSchema = yup.object({
    tipo: yup.string().required("Por favor selecione um tipo de equipamento!"),
    nome: yup.string().required("Por favor adicione um nome ao equipamento!"),
    consumo: yup.number().required("Por favor adicione um consumo energético ao equipamento!"),
});

function AdicionarEquipamento() {
    const token = localStorage.getItem("token");
    const divisionID = window.location.pathname.split("/")[2];

    const [responseMessage, setResponseMessage] = useState({ type: "", message: "" });
    const formik = useFormik({
        initialValues: {
            tipo: "",
            nome: "",
            consumo: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            axios
                .post(
                    `http://localhost:8080/smarthome/private/division/${divisionID}/devices`,
                    null,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        params: {
                            tipo: values.tipo,
                            nome: values.nome,
                            consumo: Number(values.consumo),
                        },
                    }
                )
                .then((response) => {
                    setResponseMessage({ type: "success", message: response.data.message });
                })
                .catch((error) => {
                    setResponseMessage({ type: "error", message: error.data.message });
                });
            resetForm();
        },
    });

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center">
                {responseMessage.message && (
                    <Grid item xs={12} md={12} lg={12}>
                        <MDAlert color={responseMessage.type} dismissible>
                            {responseMessage.message}
                        </MDAlert>
                    </Grid>
                )}
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <Card>
                            <MDBox
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                mx={2}
                                mt={-3}
                                p={2}
                                textAlign="center"
                            >
                                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                    Adicionar Equipamento
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid item mb={2}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                <MDTypography>Tipo de Equipamento</MDTypography>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-label="tipo"
                                                name="tipo"
                                                value={formik.values.tipo}
                                                onChange={formik.handleChange}
                                            >
                                                <FormControlLabel
                                                    value="LAMPADA"
                                                    control={<Radio />}
                                                    label="Lâmpada"
                                                />
                                                <FormControlLabel
                                                    value="AC"
                                                    control={<Radio />}
                                                    label="Ar Condicionado"
                                                />
                                                <FormControlLabel
                                                    value="REGADOR"
                                                    control={<Radio />}
                                                    label="Regador"
                                                />
                                                <FormControlLabel
                                                    value="TOMADA"
                                                    control={<Radio />}
                                                    label="Outro"
                                                />
                                            </RadioGroup>
                                            <FormHelperText>
                                                {formik.touched.tipo && formik.errors.tipo}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item mb={3}>
                                        <MDInput
                                            id="nome"
                                            name="nome"
                                            value={formik.values.nome}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.nome && Boolean(formik.errors.nome)
                                            }
                                            helperText={formik.touched.nome && formik.errors.nome}
                                            fullWidth
                                            label="Nome do Equipamento"
                                        />
                                    </Grid>
                                    <Grid item mb={3}>
                                        <MDInput
                                            id="consumo"
                                            name="consumo"
                                            value={formik.values.consumo}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.consumo &&
                                                Boolean(formik.errors.consumo)
                                            }
                                            helperText={
                                                formik.touched.consumo && formik.errors.consumo
                                            }
                                            fullWidth
                                            label="Consumo Energético"
                                        />
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <MDButton
                                                type="submit"
                                                color="success"
                                                variant="contained"
                                            >
                                                Adicionar
                                            </MDButton>
                                        </Grid>
                                        <Grid item>
                                            <MDButton
                                                type="button"
                                                color="error"
                                                variant="contained"
                                                onClick={() => formik.resetForm()}
                                            >
                                                Cancelar
                                            </MDButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </MDBox>
                        </Card>
                    </MDBox>
                </Grid>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default AdicionarEquipamento;
