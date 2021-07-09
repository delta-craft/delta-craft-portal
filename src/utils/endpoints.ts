const dev = "http://localhost:3000";
const prod = "https://portal.deltacraft.eu";

const endpoint = process.env.NODE_ENV === "development" ? dev : prod;

export default endpoint;
