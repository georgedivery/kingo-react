import axios from "axios";

const getContractPTRNAddress = () => { 
    return axios.get(`${process.env.REACT_APP_API_URL}/contract/`)
}

export default getContractPTRNAddress;
