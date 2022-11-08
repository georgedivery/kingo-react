import axios from "axios";

const getContractPTRNAddress = () => { 
    return axios.get('https://ptrn-backend.herokuapp.com/api/contract/')
}

export default getContractPTRNAddress;
