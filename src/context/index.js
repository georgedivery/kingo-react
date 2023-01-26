import { createContext } from "react";


export const AppContext = createContext();

let isInBeneficiaryList = (localStorage.getItem('has_beneficiary_list') === 'true');

export const initialState = {
    metaMaskWallet: localStorage.getItem('wallet') || '',
    isInBeneficiaryList: isInBeneficiaryList || false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "METAMASK_WALLET":
            return { ...state, metaMaskWallet: action.payload };
        case "HAS_BENEFICIARY_LIST":
            return { ...state, isInBeneficiaryList: action.payload };
        default:
            return state;
    }
};