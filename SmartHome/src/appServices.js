import axios from 'axios';

const token = localStorage.getItem('token');

async function getUserInfo() {
    const response = await axios
        .get("http://localhost:8080/smarthome/private/user/info", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function getDivisions(houseID) {
    const response = await axios
    .get(`http://localhost:8080/smarthome/private/house/${houseID}/divisions`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

async function getHouseUsers(houseID) {
    const response = await axios
    .get(`http://localhost:8080/smarthome/private/house/${houseID}/users`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

export { getUserInfo, getDivisions, getHouseUsers };
