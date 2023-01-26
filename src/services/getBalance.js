import axios from "axios";

const getBalance = (ptrnKey) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/balance/`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey
        },
    })
}

export default getBalance;