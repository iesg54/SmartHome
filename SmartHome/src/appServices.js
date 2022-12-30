import axios from "axios";

const token = localStorage.getItem("token");

async function getUserInfo() {
    const response = await axios.get("http://localhost:8080/smarthome/private/user/info", {
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
        `http://localhost:8080/smarthome/private/house/${houseID}/divisions`,
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
        `http://localhost:8080/smarthome/private/house/${houseID}/users`,
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
    debugger
    const response = await axios.post(`http://localhost:8080/smarthome/alert/${alert.id_divisao}/addAlert`, 
        null, 
        {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        params: {
            idDiv: alert.id_divisao,
            sensor: alert.sensor,
            valor: alert.valor,
            stamp: alert.stamp,
        },
    });
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

export { getUserInfo, getDivisions, getHouseUsers, addAlert };
