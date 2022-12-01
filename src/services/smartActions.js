import Web3 from 'web3';
import contract from './contract';

export const getBeneficiary = async (userAddress) => {
    let res = await contract.methods.beneficiary(userAddress).call()
    return res;
}

export const getSymbol = async (userAddress) => {
    let res = await contract.methods.symbol().call()
    return res;
}

export const changeBeneficiaryWallet = async (currentAddress, newAddress) => { 
    let res = await contract.methods.changeBeneficiaryWallet(newAddress).send({
        from: currentAddress 
    })
    return res;
}

export const releaseAmaunt = async (currentAddress) => { 
    let res = await contract.methods.release(currentAddress).send({
        from: currentAddress 
    })
    return res;
}

export const checkWallet = async (address) => {
    let result = Web3.utils.isAddress(address)
    return result;
}
