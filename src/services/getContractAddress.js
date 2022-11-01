import axios from "axios";

const getContractAddress = () => {
    return axios.get('https://ptrn-backend.herokuapp.com/api/contract/');
}

export default getContractAddress;
