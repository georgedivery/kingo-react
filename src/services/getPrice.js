import axios from "axios";

const getPrice = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/price`, { })
}

export default getPrice;