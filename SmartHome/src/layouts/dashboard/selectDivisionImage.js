import Sala from "../../assets/images/divisions/sala.jpg";
import Quarto from "../../assets/images/divisions/quarto.jpg";
import Exterior from "../../assets/images/divisions/exterior.jpg";
import Cozinha from "../../assets/images/divisions/cozinha.jpg";

function selectDivisionImage(divisionType) {
    switch (divisionType) {
        case "SALA":
            return Sala;
        case "QUARTO":
            return Quarto;
        case "EXTERIOR":
            return Exterior;
        case "COZINHA":
            return Cozinha;
        default:
            return null;
    }
}

export default selectDivisionImage;
