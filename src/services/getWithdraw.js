import axios from "axios";

const getWithdraw = (ptrnKey, metaMaskAccount) => {
    console.log('0xf682617BC843F2Be570D83E6c9f4EEFFf32DFC57')
    return axios.post('https://ptrn-backend.herokuapp.com/api/withdraw/', {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey,
            'Wallet': '0xf682617BC843F2Be570D83E6c9f4EEFFf32DFC57'
        }
    })
}

export default getWithdraw;
