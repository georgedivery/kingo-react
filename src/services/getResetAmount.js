import axios from "axios";

const getResetAmount = (ptrnKey, metaMaskAccount) => {
    // console.log(metaMaskAccount) 

    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/reset/`,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey,
            'Wallet': metaMaskAccount
        }
    })
}

export default getResetAmount;
