// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Others
import { useFormik } from "formik";
import * as yup from "yup";
import { DropzoneDialog } from "material-ui-dropzone";
import { useState } from "react";
import { storage } from "firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const validationSchema = yup.object({
    nome: yup.string().required("Por favor adicione um nome!"),
    email: yup
        .string()
        .email("Por favor adicione um email válido!")
        .required("Por favor adicione um email!"),
    password: yup
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres!")
        .required("Por favor adicione uma senha!"),
});

function EditarPerfil() {
    const formik = useFormik({
        initialValues: {
            nome: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
        },
        cleanForm: true,
    });

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const handleImageUpload = (files) => {
        const file = files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        console.log("User doesn't have permission to access the object");
                        break;
                    case "storage/canceled":
                        console.log("User canceled the upload");
                        break;
                    case "storage/unknown":
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImage(downloadURL);
                });
            }
        );
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item mb={2}>
                        <MDAvatar src={image} alt="Avatar" size="xxl" />
                    </Grid>
                    <Grid item mb={2}>
                        <MDTypography variant="h4">Editar Perfil</MDTypography>
                        <MDTypography variant="body2">
                            Altere as informações do seu perfil
                        </MDTypography>
                        <MDButton
                            color="success"
                            variant="contained"
                            size="small"
                            onClick={() => setOpen(true)}
                        >
                            Alterar foto
                        </MDButton>
                        <DropzoneDialog
                            acceptedFiles={["image/*"]}
                            cancelButtonText="cancel"
                            submitButtonText="submit"
                            maxFileSize={5000000}
                            open={open}
                            onClose={() => setOpen(false)}
                            onSave={(files) => {
                                handleImageUpload(files);
                                setOpen(false);
                            }}
                            showPreviews
                            showFileNamesInPreview
                            filesLimit={1}
                        />
                    </Grid>
                    <Grid container mb={2} justifyContent="center">
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item mb={2}>
                                <MDTypography>Nome</MDTypography>
                                <MDInput
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    placeholder="nome"
                                    value={formik.values.nome}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                                    helperText={formik.touched.nome && formik.errors.nome}
                                />
                            </Grid>
                            <Grid item mb={2}>
                                <MDTypography>Email</MDTypography>
                                <MDInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item mb={2}>
                                <MDTypography>Password</MDTypography>
                                <MDInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid container mb={2} spacing={2}>
                                <Grid item>
                                    <MDButton type="submit" color="success" variant="contained">
                                        Salvar
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
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default EditarPerfil;
