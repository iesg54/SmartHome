const monthlyEnergyCostData = {
    id: 1,
    title: "Mês",
    icon: "wallet",
    color: "warning",
    description: "Gastos por dia do mês",
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    data: [1000, 2500, 1500, 3000, 1000, 4500, 2000, 3000, 1000, 2500, 1500, 3000],
};

const yearlyEnergyCostData = {
    id: 1,
    title: "Ano",
    icon: "wallet",
    color: "warning",
    description: "Gastos por mês do ano",
    x: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ],
    data: [10000, 25000, 15000, 30000, 10000, 45000, 20000, 30000, 10000, 25000, 15000, 30000],
};

export { monthlyEnergyCostData, yearlyEnergyCostData };
