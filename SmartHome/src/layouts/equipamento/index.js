// @mui material components
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

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

const validationSchema = yup.object({
    tipo: yup.string().required("Por favor selecione um tipo de equipamento!"),
    nome: yup.string().required("Por favor adicione um nome ao equipamento!"),
    consumo: yup.number().required("Por favor adicione um consumo energético ao equipamento!"),
});

function AdicionarEquipamento() {
    const formik = useFormik({
        initialValues: {
            tipo: "",
            nome: "",
            consumo: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
        cleanForm: true,
    });

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container justifyContent="center" spacing={2}>
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
                                        value="lampada"
                                        control={<Radio />}
                                        label="Lâmpada"
                                    />
                                    <FormControlLabel
                                        value="ac"
                                        control={<Radio />}
                                        label="Ar Condicionado"
                                    />
                                    <FormControlLabel
                                        value="regador"
                                        control={<Radio />}
                                        label="Regador"
                                    />
                                    <FormControlLabel
                                        value="tomada"
                                        control={<Radio />}
                                        label="Outro"
                                    />
                                </RadioGroup>
                                <FormHelperText>
                                    {formik.touched.tipo && formik.errors.tipo}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item mb={2}>
                            <MDTypography>Nome do Equipamento</MDTypography>
                            <MDInput
                                id="nome"
                                name="nome"
                                value={formik.values.nome}
                                onChange={formik.handleChange}
                                error={formik.touched.nome && Boolean(formik.errors.nome)}
                                helperText={formik.touched.nome && formik.errors.nome}
                            />
                        </Grid>
                        <Grid item mb={2}>
                            <MDTypography>Consumo Energético</MDTypography>
                            <MDInput
                                id="consumo"
                                name="consumo"
                                value={formik.values.consumo}
                                onChange={formik.handleChange}
                                error={formik.touched.consumo && Boolean(formik.errors.consumo)}
                                helperText={formik.touched.consumo && formik.errors.consumo}
                            />
                        </Grid>
                        <Grid container spacing={2}>
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
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default AdicionarEquipamento;
