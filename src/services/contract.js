import Web3 from 'web3'; 
import axios from "axios"; 
const web3 = new Web3(window.ethereum);
 
export const getContractVestingAddress = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/vesting_contract/`)
} 

const contract = getContractVestingAddress().then(res => {  
    const contractAddress = res.data['Vesting contract address']; 
    const ABI = res.data['Vesting ABI']; 
    return new web3.eth.Contract(JSON.parse(ABI), contractAddress) 
}).catch(err => {
    console.log(err)
    console.log("Can't connect to wallet!! CORS")
}) 

export default contract;





