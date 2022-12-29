import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
import MDAlert from "components/MDAlert";

// Others
import { useFormik } from "formik";
import * as yup from "yup";
import { DropzoneDialog } from "material-ui-dropzone";
import { storage } from "firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Axios
import axios from "axios";

import { getUserInfo } from "appServices";

const validationSchema = yup.object({
    nome: yup.string().required("Por favor adicione um nome!"),
    email: yup
        .string()
        .email("Por favor adicione um email válido!")
        .required("Por favor adicione um email!"),
    password: yup.string().required("Por favor adicione uma senha!"),
});

function EditarPerfil() {
    const token = localStorage.getItem("token");

    const [messageResponse, setMessageResponse] = useState({ type: "", message: "" });

    const [editButtons, setEditButtons] = useState(false);
    const handleEditButtons = () => {
        formik.resetForm();
        setEditButtons(!editButtons);
    };

    // get user data from the API and set it to the state http://localhost:8080/smarthome/private/user/{userID}
    const [userData, setUserData] = useState({});
    useEffect(async () => {
        const user = await getUserInfo(token);
        setUserData(user);
    }, []);

    const formik = useFormik({
        initialValues: {
            nome: userData.nome,
            email: userData.email,
            password: userData.password,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            setMessageResponse({ type: "", message: "" });
            axios
                .put(`http://localhost:8080/smarthome/private/user/${userData.id}`, {
                    id: userData.id,
                    email: values.email,
                    nome: values.nome,
                    password: values.password,
                    profileImage: image,
                    admin: userData.admin,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    setUserData({
                        ...userData,
                        nome: values.nome,
                        email: values.email,
                        password: values.password,
                        profileImage: image,
                    });
                    setMessageResponse({
                        type: "success",
                        message: "Dados atualizados com sucesso!",
                    });
                    resetForm();
                })
                .catch((error) => {
                    setMessageResponse({ type: "error", message: "Erro ao atualizar os dados!" });
                });
            setEditButtons(false);
        },
        cleanForm: true,
        enableReinitialize: true,
    });

    const [open, setOpen] = useState(false);

    const [image, setImage] = useState("");
    useEffect(() => {
        setImage(userData.profileImage);
    }, [userData.profileImage]);

    const handleImageUpload = (files) => {
        setMessageResponse({ type: "", message: "" });
        const file = files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case "paused":
                        break;
                    case "running":
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        setMessageResponse({ type: "error", message: "Não autorizado" });
                        break;
                    case "storage/canceled":
                        setMessageResponse({ type: "error", message: "Cancelado" });
                        break;
                    case "storage/unknown":
                        setMessageResponse({ type: "error", message: "Erro desconhecido" });
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL);
                    axios
                        .put(
                            `http://localhost:8080/smarthome/private/user/profilePic/${userData.id}`,
                            null,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                                params: {
                                    profPic: downloadURL,
                                },
                            }
                        )
                        .then((response) => {
                            setMessageResponse({
                                type: "success",
                                message: "Imagem atualizada com sucesso!",
                            });
                        })
                        .catch((error) => {
                            setMessageResponse({
                                type: "error",
                                message: "Erro ao atualizar a imagem!",
                            });
                        });
                });
            }
        );
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center" minHeight="100vh">
                {messageResponse.message && (
                    <Grid item xs={12} md={12}>
                        <MDAlert color={messageResponse.type} dismissible>
                            {messageResponse.message}
                        </MDAlert>
                    </Grid>
                )}
                <Grid item xs={12} md={12}>
                    <MDBox display="flex" justifyContent="center" alignItems="center" p={3}>
                        <Card>
                            <Grid container justifyContent="center" alignItems="center" p={3}>
                                <Grid item mb={2} mr={2}>
                                    <MDAvatar
                                        src={image}
                                        alt="Avatar"
                                        size="xxl"
                                        shadow="md"
                                        bgColor="dark"
                                    />
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
                            </Grid>
                            <Grid container mb={2} justifyContent="center">
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid item mb={2}>
                                        <MDInput
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            placeholder="nome"
                                            value={formik.values.nome}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.nome && Boolean(formik.errors.nome)
                                            }
                                            helperText={formik.touched.nome && formik.errors.nome}
                                            fullWidth
                                            disabled={!editButtons}
                                        />
                                    </Grid>
                                    <Grid item mb={2}>
                                        <MDInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.email && Boolean(formik.errors.email)
                                            }
                                            helperText={formik.touched.email && formik.errors.email}
                                            fullWidth
                                            disabled={!editButtons}
                                        />
                                    </Grid>
                                    <Grid item mb={2}>
                                        <MDInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.password &&
                                                Boolean(formik.errors.password)
                                            }
                                            helperText={
                                                formik.touched.password && formik.errors.password
                                            }
                                            fullWidth
                                            disabled={!editButtons}
                                        />
                                    </Grid>
                                    {editButtons ? (
                                        <Grid container mb={2} spacing={2}>
                                            <Grid item>
                                                <MDButton
                                                    type="submit"
                                                    color="success"
                                                    variant="contained"
                                                >
                                                    Salvar
                                                </MDButton>
                                            </Grid>
                                            <Grid item>
                                                <MDButton
                                                    type="button"
                                                    color="error"
                                                    variant="contained"
                                                    onClick={() => handleEditButtons()}
                                                >
                                                    Cancelar
                                                </MDButton>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid item mb={2}>
                                            <MDButton
                                                type="button"
                                                color="primary"
                                                variant="contained"
                                                onClick={() => setEditButtons(true)}
                                                fullWidth
                                            >
                                                Editar
                                            </MDButton>
                                        </Grid>
                                    )}
                                </form>
                            </Grid>
                        </Card>
                    </MDBox>
                </Grid>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default EditarPerfil;
