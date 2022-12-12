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

// Others
import { useFormik } from "formik";
import * as yup from "yup";
import { DropzoneDialog } from "material-ui-dropzone";
import { storage } from "firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Axios
import axios from "axios";

const validationSchema = yup.object({
    nome: yup.string().required("Por favor adicione um nome!"),
    email: yup
        .string()
        .email("Por favor adicione um email válido!")
        .required("Por favor adicione um email!"),
    password: yup.string().required("Por favor adicione uma senha!"),
});

function EditarPerfil() {
    // get userID from local storage
    const userID = localStorage.getItem("userID");

    // get user data from the API and set it to the state http://localhost:8080/smarthome/private/user/{userID}
    const [userData, setUserData] = useState({});
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/user/${userID}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            nome: userData.nome,
            email: userData.email,
            password: userData.password,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            axios
                .put(`http://localhost:8080/smarthome/private/user/${userID}`, {
                    id: userID,
                    email: values.email,
                    nome: values.nome,
                    password: values.password,
                    profileImage: image,
                    admin: userData.admin,
                })
                .then((response) => {
                    console.log(response);
                    resetForm();
                })
                .catch((error) => {
                    console.log(error);
                });
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

                    // save image url to the database http://localhost:8080/smarthome/private/user/profilePic/{userID}
                    axios
                        .put(
                            `http://localhost:8080/smarthome/private/user/profilePic/${userID}`,
                            null,
                            {
                                params: {
                                    profPic: downloadURL,
                                },
                            }
                        )
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            }
        );
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container justifyContent="center">
                <MDBox py={3}>
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
                                        error={formik.touched.nome && Boolean(formik.errors.nome)}
                                        helperText={formik.touched.nome && formik.errors.nome}
                                        fullWidth
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
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        fullWidth
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
                    </Card>
                </MDBox>
            </Grid>
            <Footer />
        </DashboardLayout>
    );
}

export default EditarPerfil;
