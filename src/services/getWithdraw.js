import axios from "axios";

const getWithdraw = (ptrnKey, metaMaskAccount) => {
    // console.log(metaMaskAccount) 

    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/withdraw/`,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey,
            'Wallet': metaMaskAccount
        }
    })
}

export default getWithdraw;
