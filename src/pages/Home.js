
import pathearnLogo from '../assets/images/Image-7.png';
import backgroundImage from '../assets/images/Rectangle-1508.jpg';

import { AppContext } from "../context";

import { useState, useEffect, useCallback, useContext, memo } from 'react';

import BoxConnectWallet from '../components/boxConnectWallet';
import BoxPtrnBalance from '../components/boxPtrnBalance';
import BoxPtrnKey from '../components/boxPtrnKey';
import BoxPtrnWithdraw from '../components/boxPtrnWithdraw';
import PopupInstallMetaMask from '../components/popupInstallMetaMask';
import PopupErrorMessage from '../components/popupErrorMessage';
import PopupOpenMetaMask from '../components/popupOpenMetaMask';

import Header from '../components/Header';
import BtnAddToken from '../components/btnAddToken'

import getContractPTRNAddress from '../services/getContractPTRNAddress';
import getBalance from '../services/getBalance';
import getWithdraw from '../services/getWithdraw';
import getResetAmount from '../services/getResetAmount';
import { getBeneficiary } from '../services/smartActions';
import addPTRNdata from '../services/assetAdder';

function Home() {
    const { state, dispatch } = useContext(AppContext);
    const [metaMaskAccount, setMetaMaskAccount] = useState(state.metaMaskWallet);
    const [ptrnKey, setPtrnKey] = useState(null);
    const [popupInstallMetamask, setPopupInstallMetamask] = useState(false);
    const [serverErr, setServerErr] = useState(false);
    const [popupError, setPopupError] = useState(false);
    const [popupErrorMessage, setPopupErrorMessage] = useState('');
    const [popupOpenlMetamask, setPopupOpenlMetamask] = useState(false);
    const [boxPtrnBalance, setBoxPtrnBalance] = useState(false);
    const [balanceData, setBalanceData] = useState({});
    const [contractPTRNAddress, setContractPTRNAddress] = useState();
    const [balanceLoader, setBalanceLoader] = useState(false);
    const [withdrawLoader, setWithdrawLoader] = useState(false);
    const [errPtrnKey, setErrPtrnKey] = useState(false);
    //const BALANCE_ERROR_MESSAGE = "Unable to connect to validation server. Please try again later!"

    useEffect(() => {
        getContractPTRNAddress()
            .then(res => {
                setContractPTRNAddress(res.data)

                if (res.status === 503) {
                    setServerErr(true)
                }
            })
            .catch(err => {
                setServerErr(true)
            })
    }, [])

    const checkBeneficiary = useCallback((metaMaskAccount) => {
        getBeneficiary(metaMaskAccount).then(res => {
            dispatch({
                type: "HAS_BENEFICIARY_LIST",
                payload: true
            });
        }).catch((err) => {
            dispatch({
                type: "HAS_BENEFICIARY_LIST",
                payload: false
            });
            localStorage.setItem('has_beneficiary_list', false);
        })
    }, [dispatch])

    const connectToMetaMask = useCallback(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    const account = accounts[0];
                    setMetaMaskAccount(account)
                    dispatch({
                        type: "METAMASK_WALLET",
                        payload: account
                    });
                    checkBeneficiary(account)
                    localStorage.setItem('wallet', account);
                    localStorage.setItem('has_beneficiary_list', true);
                })
                .catch((err) => {
                    if (err.code === -32002) {
                        setPopupOpenlMetamask(true);
                    } else {
                        console.error(err);
                    }
                })
        } else {
            setPopupInstallMetamask(true)
            console.log('err')
        }
    }, [checkBeneficiary, dispatch])

    useEffect(() => {
        // addPTRNdata();

        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('chainChanged', function (networkId) {
                setTimeout(() => {
                    if (networkId !== '0x89') {
                        setPopupError(true)
                        setPopupErrorMessage('Please connect to Polygon network!')
                    } else {
                        setPopupError(false)
                        setPopupErrorMessage('')
                    }
                }, 10)
            })

            window.ethereum.on('accountsChanged', function (accounts) {
                console.log('accountsChanged')
                setMetaMaskAccount(accounts[0])
                dispatch({ type: "METAMASK_WALLET", payload: accounts[0] });
                checkBeneficiary(accounts[0])
            })
        }
    }, [checkBeneficiary, dispatch])

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum
                .request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (window.ethereum.networkVersion === '137') {
                        if (accounts[0] === localStorage.getItem('wallet')) {
                            connectToMetaMask()
                        } else {
                            localStorage.removeItem('wallet')
                            dispatch({ type: "METAMASK_WALLET", payload: '' });
                            localStorage.setItem('has_beneficiary_list', false);
                        }
                        setPopupError(false)
                        setPopupErrorMessage('')
                    } else {
                        setPopupError(true)
                        setPopupErrorMessage('Please connect to Polygon network!')
                    }
                })
                .catch((err) => { })
        }

    }, [connectToMetaMask, dispatch])



    const handleClosePopupOpenMetaMask = () => {
        setPopupOpenlMetamask(false);
    }

    const handleClosePopupError = () => {
        setPopupError(false);
        // setBoxPtrnBalance(false)
    }

    const handleClosePopupInstallMetamask = () => {
        setPopupInstallMetamask(false);
    }

    const handlePtrnKeyInputChange = (e) => {
        setPtrnKey(e.target.value)
    }

    const handlecheckBalance = () => {
        if (ptrnKey === null) {
            setErrPtrnKey(true)
        } else if (ptrnKey.substring(0, 3).toLowerCase() === 'pat' ||
            ptrnKey.substring(0, 3).toLowerCase() === 'lab' ||
            ptrnKey.substring(0, 3).toLowerCase().lenght >= 3) {
            setErrPtrnKey(false)
            setBalanceLoader(true)
            getBalance(ptrnKey).then(res => {
                setBoxPtrnBalance(true)
                setBalanceLoader(false)
                setBalanceData(res.data)
            }).catch(err => {
                setPopupError(true);
                setBalanceLoader(false)
                setPopupErrorMessage(err.response.data)
            })
        } else {
            setErrPtrnKey(true)
        }
    }


    const handleWithdraw = () => {
        setWithdrawLoader(true)
        getWithdraw(ptrnKey, metaMaskAccount)
            .then(res => {
                setPopupError(true);
                setPopupErrorMessage(res.data)
                setWithdrawLoader(false)

                getBalance(ptrnKey).then(res => {
                    setBalanceData(res.data)
                }).catch(err => {
                    setPopupErrorMessage(err.response.data)
                })
            }).catch(err => {
                setPopupError(true);
                setPopupErrorMessage(err.response.data)
                setWithdrawLoader(false)
            })
    }

    const handleReset = () => {
        getResetAmount(ptrnKey, metaMaskAccount).then(res => {
            setPopupError(false);
            setBoxPtrnBalance(false)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="App">
            <div className="wrapper">
                <Header connectToMetaMask={connectToMetaMask} />
                <div className="main">
                    <section className="section-pathearn">
                        <div className="section-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
                        </div>

                        <div className="shell">
                            <div className="section-inner">
                                <div className="section-head">
                                    <h2 className="section-title">
                                        <img src={pathearnLogo} alt="#" />
                                        PATHEARN DASHBOARD
                                    </h2>
                                    {(state.metaMaskWallet && contractPTRNAddress) &&
                                        <BtnAddToken
                                            addToken={addPTRNdata}
                                            contractAddress={(contractPTRNAddress && !serverErr) ? contractPTRNAddress['PTRN contract address'] : ''}
                                        />}

                                    {/*contractPTRNAddress && !serverErr &&
                                        <p>
                                            {Object.keys(contractPTRNAddress)}: &nbsp;
                                            <span>{contractPTRNAddress['PTRN contract address']}</span>
                                        </p>
                                    */}

                                    {serverErr &&
                                        <p>
                                            Service temporary unavailable.
                                        </p>
                                    }


                                </div>

                                <div className="section-box-wrapper">

                                    {(state.metaMaskWallet === undefined || state.metaMaskWallet === '') && <BoxConnectWallet metaMaskAccount={state.metaMaskWallet} connectToMetaMask={connectToMetaMask} />}

                                    {(state.metaMaskWallet !== undefined && state.metaMaskWallet !== '' && boxPtrnBalance === false && !serverErr) &&
                                        <BoxPtrnKey
                                            balanceLoader={balanceLoader}
                                            errPtrnKey={errPtrnKey}
                                            handlecheckBalance={handlecheckBalance}
                                            handlePtrnKeyInputChange={handlePtrnKeyInputChange}
                                        />}

                                    {state.metaMaskWallet !== '' && boxPtrnBalance &&
                                        <BoxPtrnBalance
                                            handleReset={handleReset}
                                            withdrawLoader={withdrawLoader}
                                            balanceData={balanceData}
                                            handleWithdraw={handleWithdraw}
                                        />
                                    }

                                    {false && <BoxPtrnWithdraw />}
                                </div>
                            </div>
                        </div>
                    </section>

                    {popupInstallMetamask && <PopupInstallMetaMask handleClosePopupInstallMetamask={handleClosePopupInstallMetamask} />}

                    {popupOpenlMetamask && <PopupOpenMetaMask handleClosePopupOpenMetaMask={handleClosePopupOpenMetaMask} />}

                    {popupError && <PopupErrorMessage serverErr={serverErr} handleClosePopupError={handleClosePopupError} message={popupErrorMessage} />}
                </div>

            </div>
        </div>
    );
}

export default memo(Home);


