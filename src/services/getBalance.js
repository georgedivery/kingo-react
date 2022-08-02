import axios from "axios";

const getBalance = (ptrnKey) => {
    return axios.get('https://ptrn-backend.herokuapp.com/api/balance/', {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey
        },
    })
}

export default getBalance;