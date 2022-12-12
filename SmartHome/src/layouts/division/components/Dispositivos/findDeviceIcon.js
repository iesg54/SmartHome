export function findDeviceIcon(type) {
    switch (type) {
        case "LAMPADA":
            return "lightbulb";
        case "AC":
            return "air";
        case "REGADOR":
            return "sprinkler";
        case "TOMADA":
            return "power";
        default:
            return "power";
    }
}
