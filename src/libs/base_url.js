import axios from "axios";

const base_url = axios.create(process.env.BASE_URL);

export default base_url;