const energyChartData = {
    icon: {
        color: "warning",
        component: "bolt",
    },
    title: "Energia Consumida",
    description: "Energia consumida por esta divisão",
    chart: {
        labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7"],
        datasets: [
            {
                label: "Energia",
                color: "dark",
                data: [300, 500, 100, 400, 300, 200, 100],
            },
        ],
    },
};

export default energyChartData;
