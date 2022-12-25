import { useState } from "react";

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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Others
import { useFormik } from "formik";
import * as yup from "yup";

// Axios
import axios from "axios";

const validationSchema = yup.object({});

function AdicionarDivisao({ casaID }) {
    console.log(casaID)
    const [responseMessage, setResponseMessage] = useState();
    const formik = useFormik({
        initialValues: {},
        validationSchema: validationSchema,
        onSubmit: (values, { cleanForm }) => {
            axios
                .post(`http://localhost:8080/smarthome/private/house/${casaID}/divisions`,
                null,
                {
                    params: {
                        tipo: values.tipo,
                        nome: values.nome,
                }
            })
        },
        cleanForm: true,
    });

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center">
                <MDBox py={3}>
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
                                Adicionar Divisão
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={4} pb={3} px={3}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid item mb={2}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            <MDTypography>Tipo de Divisão</MDTypography>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="tipo"
                                            name="tipo"
                                            value={formik.values.tipo}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel
                                                value="SALA"
                                                control={<Radio />}
                                                label="Sala"
                                            />
                                            <FormControlLabel
                                                value="COZINHA"
                                                control={<Radio />}
                                                label="Cozinha"
                                            />
                                            <FormControlLabel
                                                value="QUARTO"
                                                control={<Radio />}
                                                label="Quarto"
                                            />
                                            <FormControlLabel
                                                value="EXTERIOR"
                                                control={<Radio />}
                                                label="Exterior"
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
                                        error={formik.touched.nome && Boolean(formik.errors.nome)}
                                        helperText={formik.touched.nome && formik.errors.nome}
                                        fullWidth
                                        label="Nome da Divisão"
                                    />
                                </Grid>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <MDButton type="submit" color="success" variant="contained">
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
                        {responseMessage && (
                            <MDBox px={3} pb={3}>
                                <MDTypography variant="h5" color="success">
                                    {responseMessage}
                                </MDTypography>
                            </MDBox>
                        )}
                    </Card>
                </MDBox>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default AdicionarDivisao;
