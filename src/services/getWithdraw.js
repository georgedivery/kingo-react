import axios from "axios";

const getWithdraw = (ptrnKey, metaMaskAccount) => {
    console.log(metaMaskAccount) 

    return axios({
        method: 'post',
        url: 'https://ptrn-backend.herokuapp.com/api/withdraw/',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey,
            'Wallet': metaMaskAccount
        }
    })
}

export default getWithdraw;
