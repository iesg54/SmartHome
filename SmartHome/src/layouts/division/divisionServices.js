import axios from "axios";

const token = localStorage.getItem("token");

async function getDivisionInfo(houseID, divID) {
    const response = await axios.get(
        `http://192.168.160.238:8080/smarthome/private/house/${houseID}/division/${divID}`,
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

export { getDivisionInfo };
