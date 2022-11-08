import contract from './contract';

export const getBeneficiary = async (userAddress) => {
    let res = await contract.methods.beneficiary(userAddress).call()
    return res;
}

export const getSymbol = async (userAddress) => {
    let res = await contract.methods.symbol().call()
    return res;
}

