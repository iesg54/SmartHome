import axios from "axios";

const token = localStorage.getItem("token");

async function getUserInfo() {
    const response = await axios.get("http://192.168.160.238:8080/smarthome/private/user/info", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function getDivisions(houseID) {
    const response = await axios.get(
        `http://192.168.160.238:8080/smarthome/private/house/${houseID}/divisions`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function getHouseUsers(houseID) {
    const response = await axios.get(
        `http://192.168.160.238:8080/smarthome/private/house/${houseID}/users`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function addAlert(alert) {
    const response = await axios.post(
        `http://192.168.160.238:8080/smarthome/private/division/${alert.id_divisao}/addAlert`,
        null,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                sensor: alert.sensor,
                valor: alert.value,
                stamp: alert.stamp,
            },
        }
    );
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function getAlerts(houseID) {
    const response = await axios.get(
        `http://192.168.160.238:8080/smarthome/private/house/${houseID}/latestAlerts`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function logout() {
    const response = await axios.get(
        `http://192.168.160.238:8080/smarthome/private/user/logout`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export { getUserInfo, getDivisions, getHouseUsers, addAlert, getAlerts, logout };
