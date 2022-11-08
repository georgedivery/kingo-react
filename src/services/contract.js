import Web3 from 'web3';
import { ABI } from "../utils/ABI";

const contractAddress = '0x76400F86725dE13e2708480B67DeB060ebD22D4C';  
const provider = "https://polygon-rpc.com";

const web3 = new Web3(provider);
const contract = new web3.eth.Contract(ABI, contractAddress);

export default contract;