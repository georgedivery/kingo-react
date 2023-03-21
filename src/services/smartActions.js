import Web3 from 'web3';
import contract from './contract';

export const getBeneficiary = async (userAddress) => {
    const res = contract.then(x => {
        return x.methods.beneficiary(userAddress).call({
            from: userAddress
        })
    })
    return res;
}

export const getSymbol = async () => {
    const res = contract.then(x => {
        return x.methods.symbol().call()
    })
    return res;
}

export const changeBeneficiaryWallet = async (currentAddress, newAddress) => {
    const res = contract.then(x => {
        return x.methods.changeBeneficiaryWallet(newAddress).send({
            from: currentAddress
        })
    })
    return res;
}

export const releaseAmaunt = async (currentAddress) => {
    const res = contract.then(x => {
        return x.methods.release(currentAddress).send({
            from: currentAddress
        })
    })
    return res;
}

export const checkWallet = async (address) => {
    let result = Web3.utils.isAddress(address)
    return result;
}
