// Material-UI components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Formik and Yup
import { useFormik } from "formik";
import * as yup from "yup";

// Axios
import axios from "axios";

// PropTypes
import PropTypes from "prop-types";

const validationSchema = yup.object({
    startTime: yup.string(),
    endTime: yup.string(),
    tempAtual: yup.number(),
    tempMax: yup.number(),
    tempMin: yup.number(),
    luminosidade: yup.number(),
});

function ActionModal({
    idDisp,
    idDivision,
    startTime,
    endTime,
    tempAtual,
    tempMax,
    tempMin,
    luminosidade,
    closeAction,
    open,
    tipoDisp,
}) {
    const formik = useFormik({
        initialValues: {
            startTime: startTime,
            endTime: endTime,
            tempAtual: Number(tempAtual),
            tempMax: Number(tempMax),
            tempMin: Number(tempMin),
            luminosidade: Number(luminosidade),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            switch (tipoDisp) {
                case "LAMPADA":
                    axios
                        .put(
                            `http://localhost:8080/smarthome/private/division/${idDivision}/lampadas/${idDisp}`,
                            null,
                            {
                                params: {
                                    start_time: values.startTime,
                                    end_time: values.endTime,
                                    luminosidade: values.luminosidade,
                                },
                            }
                        )
                        .then(() => {
                            closeAction();
                        })
                    break;
                case "AC":
                    axios
                        .put(
                            `http://localhost:8080/smarthome/private/division/${idDivision}/AC/${idDisp}`,
                            null,
                            {
                                params: {
                                    temp_atual: values.tempAtual,
                                    temp_max: values.tempMax,
                                    temp_min: values.tempMin,
                                },
                            }
                        )
                        .then(() => {
                            closeAction();
                        })
                    break;
                case "REGADOR":
                    axios
                        .put(
                            `http://localhost:8080/smarthome/private/division/${idDivision}/regadores/${idDisp}`,
                            null,
                            {
                                params: {
                                    start_time: values.startTime,
                                    end_time: values.endTime,
                                },
                            }
                        )
                        .then(() => {
                            closeAction();
                        })
                    break;
                default:
                    break;
            }
        },
        resetForm: true,
        enableReinitialize: true,
    });

    if (tipoDisp === "TOMADA") {
        return (
            <Dialog open={open} onClose={closeAction} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ações do Disositivo</DialogTitle>
                <DialogContent>
                    <DialogContentText>Sem ações disponíveis!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={closeAction} color="primary">
                        Cancelar
                    </MDButton>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={closeAction} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ações do Dispositivo</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Efetue as ações desejadas para o dispositivo.
                    </DialogContentText>
                    {(tipoDisp === "LAMPADA" || tipoDisp === "REGADOR") && (
                        <MDBox display="flex" flexDirection="column" alignItems="center" m={3}>
                            <MDTypography variant="h6" color="primary">
                                Horário de Ativação
                            </MDTypography>
                            <MDBox display="flex" flexDirection="row" alignItems="center">
                                <MDInput
                                    id="startTime"
                                    name="startTime"
                                    type="time"
                                    value={formik.values.startTime}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.startTime && Boolean(formik.errors.startTime)
                                    }
                                    helperText={formik.touched.startTime && formik.errors.startTime}
                                />
                                <MDTypography variant="h6" color="dark" m={2}>
                                    até
                                </MDTypography>
                                <MDInput
                                    id="endTime"
                                    name="endTime"
                                    type="time"
                                    value={formik.values.endTime}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                    helperText={formik.touched.endTime && formik.errors.endTime}
                                />
                            </MDBox>
                        </MDBox>
                    )}
                    {tipoDisp === "AC" && (
                        <MDBox display="flex" flexDirection="column" alignItems="center">
                            <MDTypography variant="h6" color="primary">
                                Mínimo e Máximo
                            </MDTypography>
                            <MDBox display="flex" flexDirection="row" alignItems="center">
                                <MDInput
                                    id="tempMin"
                                    name="tempMin"
                                    type="number"
                                    value={formik.values.tempMin}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tempMin && Boolean(formik.errors.tempMin)}
                                    helperText={formik.touched.tempMin && formik.errors.tempMin}
                                />
                                <MDTypography variant="h6" color="dark" m={2}>
                                    até
                                </MDTypography>
                                <MDInput
                                    id="tempMax"
                                    name="tempMax"
                                    type="number"
                                    value={formik.values.tempMax}
                                    onChange={formik.handleChange}
                                    error={formik.touched.tempMax && Boolean(formik.errors.tempMax)}
                                    helperText={formik.touched.tempMax && formik.errors.tempMax}
                                />
                            </MDBox>
                            <MDTypography variant="h6" color="primary">
                                Temperatura Atual
                            </MDTypography>
                            <Slider
                                id="tempAtual"
                                name="tempAtual"
                                value={formik.values.tempAtual}
                                onChange={formik.handleChange}
                                aria-label="Temperature"
                                defaultValue={formik.values.tempAtual}
                                valueLabelDisplay="auto"
                                step={0.5}
                                min={formik.values.tempMin}
                                max={formik.values.tempMax}
                            />
                        </MDBox>
                    )}
                    {tipoDisp === "LAMPADA" && (
                        <MDBox display="flex" flexDirection="column" alignItems="center">
                            <MDTypography variant="h6" color="primary">
                                Luminosidade
                            </MDTypography>
                            <Slider
                                id="luminosidade"
                                name="luminosidade"
                                value={formik.values.luminosidade}
                                onChange={formik.handleChange}
                                aria-label="Luminosity"
                                defaultValue={formik.values.luminosidade}
                                valueLabelDisplay="auto"
                                step={0.5}
                                min={0}
                                max={100}
                            />
                        </MDBox>
                    )}
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={closeAction} color="primary">
                        Cancelar
                    </MDButton>
                    <MDButton type="submit" color="success">
                        Salvar
                    </MDButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}

ActionModal.defaultProps = {
    startTime: "00:00",
    endTime: "00:00",
    tempAtual: 0,
    tempMax: 0,
    tempMin: 0,
    luminosidade: 0,
};

ActionModal.propTypes = {
    idDisp: PropTypes.number.isRequired,
    idDivision: PropTypes.number.isRequired,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    tempAtual: PropTypes.number,
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
    luminosidade: PropTypes.number,
    closeAction: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    tipoDisp: PropTypes.string.isRequired,
};

export default ActionModal;
