import axios from "axios";

const getWithdraw = (ptrnKey, metaMaskAccount) => {
    return axios.post('https://ptrn-backend.herokuapp.com/api/withdraw/', {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey,
            'Wallet': metaMaskAccount
        }
    })
}

export default getWithdraw;
