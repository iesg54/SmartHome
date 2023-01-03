// Axios
import axios from "axios";

const token = localStorage.getItem("token");

async function getEnergyCost(houseID) {
    const response = await axios.get(
        `http://192.168.160.238:8080/smarthome/private/house/${houseID}/energy/current`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        for (const key in response.data) {
            response.data[key] = Math.round(response.data[key] / 10) * 10;
        }
        return response.data;
    } else {
        return null;
    }
}

async function getEnergyCostInfoLastWeek(houseID) {
    const res = await axios.get(`http://192.168.160.238:8080/smarthome/private/house/${houseID}/energy/week`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.status === 200) {
        let costPerDay = new Array(Object.keys(res.data[1]).length).fill(0);
        let costPerDivision = [];
        let lastW = [];
        for (const key in res.data) {
            let sum = 0;
            let count = 0;
            for (const key2 in res.data[key]) {
                let date = key2.split("T")[0];
                if (!lastW.includes(date)) {
                    lastW.push(date);
                }
                let day = Math.round(res.data[key][key2] / 10) * 10;
                costPerDay[count] += day;
                sum += day;
                count++;
            }
            costPerDivision.push(sum);
        }
        for (let i = 0; i < costPerDay.length; i++) {
            costPerDay[i] = costPerDay[i] / Object.keys(res.data).length;
        }
        return { costPerDay: costPerDay, costPerDivision: costPerDivision, lastWeek: lastW.sort() };
    } else {
        return null;
    }
}

async function getEnergyCostInfoLastMonth(houseID) {
    const res = await axios.get(`http://192.168.160.238:8080/smarthome/private/house/${houseID}/energy/month`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.status === 200) {
        let costPerDay = new Array(Object.keys(res.data[1]).length).fill(0);
        let costPerDivision = [];
        let lastW = [];
        for (const key in res.data) {
            let sum = 0;
            let count = 0;
            for (const key2 in res.data[key]) {
                let date = key2.split("T")[0];
                if (!lastW.includes(date)) {
                    lastW.push(date);
                }
                let day = Math.round(res.data[key][key2] / 10) * 10;
                costPerDay[count] += day;
                sum += day;
                count++;
            }
            costPerDivision.push(sum);
        }
        for (let i = 0; i < costPerDay.length; i++) {
            costPerDay[i] = costPerDay[i] / Object.keys(res.data).length;
        }
        return {
            costPerDay: costPerDay,
            costPerDivision: costPerDivision,
            lastMonth: lastW.sort(),
        };
    } else {
        return null;
    }
}

async function deleteDivision(houseID, divID) {
    const response = await axios.delete(
        `http://192.168.160.238:8080/smarthome/private/house/${houseID}/divisions`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                idDiv: divID,
            },
        }
    );
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export { getEnergyCost, getEnergyCostInfoLastWeek, getEnergyCostInfoLastMonth, deleteDivision };
