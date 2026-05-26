import axios from "axios";

const API = axios.create({

  baseURL:
    "https://breathe-esg-ingestion-platform-2.onrender.com/api/",
});

export default API;