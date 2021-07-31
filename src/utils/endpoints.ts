const dev = "https://api.deltacraft.eu";
const prod = "https://api.deltacraft.eu";

const endpoint = process.env.NODE_ENV === "development" ? dev : prod;

export default endpoint;
