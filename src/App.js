import logo from './assets/images/Kingo-logo-color.png';
import pathearnLogo from './assets/images/Image-7.png';
import backgroundImage from './assets/images/Rectangle-1508.jpg';

import './assets/fonts/Montserrat-Black.otf';
import './assets/fonts/Montserrat-Bold.otf';
import './assets/fonts/Montserrat-Regular.otf';
import './assets/fonts/Montserrat-UltraLight.otf';
import './App.css';

import { useState, useEffect } from 'react';

import BoxConnectWallet from './components/boxConnectWallet'
import BoxPtrnBalance from './components/boxPtrnBalance'
import BoxPtrnKey from './components/boxPtrnKey'
import BoxPtrnWithdraw from './components/boxPtrnWithdraw'
import PopupInstallMetaMask from './components/popupInstallMetaMask'
import PopupErrorMessage from './components/popupErrorMessage'
import PopupOpenMetaMask from './components/popupOpenMetaMask'
import BtnConnectMetaMask from './components/btnConnectMetaMask'

import getContractAddress from './services/getContractAddress'
import getBalance from './services/getBalance'
import getWithdraw from './services/getWithdraw'

function App() {

    const contract = '0x6E2569DBbA0b94710FD07284f3Da54391937a348';
    const ABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "beneficiary_",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "releaseDates",
                    "type": "uint256[]"
                }
            ],
            "name": "addBeneficiary",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "beneficiary_",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "releaseDate",
                    "type": "uint256"
                }
            ],
            "name": "addPaymentToBeneficiary",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "beneficiary_",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "reason",
                    "type": "string"
                }
            ],
            "name": "cancelPaymentsToBeneficiary",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newBeneficiary",
                    "type": "address"
                }
            ],
            "name": "changeBeneficiaryWallet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "beneficiary_",
                    "type": "address"
                }
            ],
            "name": "release",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "name": "transferExcessBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract DummyToken",
                    "name": "token_",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "beneficiary_",
                    "type": "address"
                }
            ],
            "name": "beneficiary",
            "outputs": [
                {
                    "internalType": "uint256[3][]",
                    "name": "",
                    "type": "uint256[3][]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "currentBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "currentNonUtilizedAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCanceledPaymentsAddresses",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "beneficiary_",
                    "type": "address"
                }
            ],
            "name": "getReasonForCancellation",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "returnBeneficiaryList",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "timeNow",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token",
            "outputs": [
                {
                    "internalType": "contract DummyToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalUnreleasedPayments",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // RPC PROVIDER - https://polygon-rpc.com

    // Функциите, които трябва да се викат:
    // release(address)
    // beneficiary(address)

    // Втората не иска подписване и може директно да се вика с call()

    // С нея можеш да започнеш за да тестваш комуникацията с контракта

    const [metaMaskAccount, setMetaMaskAccount] = useState(null);
    const [ptrnKey, setPtrnKey] = useState(null);
    const [popupInstallMetamask, setPopupInstallMetamask] = useState(false);
    const [popupError, setPopupError] = useState(false);
    const [popupErrorMessage, setPopupErrorMessage] = useState('');
    const [popupOpenlMetamask, setPopupOpenlMetamask] = useState(false);
    const [boxPtrnBalance, setBoxPtrnBalance] = useState(false);
    const [balanceData, setBalanceData] = useState({});
    const [contractAddress, setContractAddress] = useState();

    useEffect(() => {
        getContractAddress().then(res => setContractAddress(res.data))
    }, [])

    const connectToMetaMask = () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleAccountsChanged)
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
    }

    const handleAccountsChanged = (accounts) => {
        const account = accounts[0];
        setMetaMaskAccount(account)
    }

    const handleClosePopupOpenMetaMask = () => {
        setPopupOpenlMetamask(false);
    }

    const handleClosePopupError = () => {
        setPopupError(false);
        setBoxPtrnBalance(false)
    }

    const handleClosePopupInstallMetamask = () => {
        setPopupInstallMetamask(false);
    }

    const handlePtrnKeyInputChange = (e) => {
        setPtrnKey(e.target.value)
    }

    const handlecheckBalance = () => {
        getBalance(ptrnKey).then(res => {
            console.log(res.data)
            setBoxPtrnBalance(true)
            setBalanceData(res.data)
        }).catch(err => {
            setPopupError(true);
            setPopupErrorMessage(err.response.data)
            console.log(err)
        })
    }

    const handleWithdraw = () => {
        getWithdraw(ptrnKey, metaMaskAccount)
            .then(res => {
                console.log(res)
                setPopupError(true);
                setPopupErrorMessage(res.data)
            }).catch(err => {
                setPopupError(true);
                setPopupErrorMessage(err.response.data)
                console.log(err)
            })
    }


    return (
        <div className="App">
            <div className="wrapper">
                <header className="header">
                    <div className="shell">
                        <a className="logo" href="/">
                            <img src={logo} alt="Kingo Logo" />
                        </a>

                        <div className="navigation">
                            <div id="navbar" className="menu-top-container">
                                <ul id="menu-top" className="nav">
                                    <li id="menu-item-29" className="menu-item">
                                        <a href="https://kingo.ai/">Home</a>
                                    </li>
                                </ul>
                            </div>

                            <a href="https://kingo.ai/instructions/" className='menu-link' target="_blank">Instructions</a>

                            <BtnConnectMetaMask metaMaskAccount={metaMaskAccount} onClick={connectToMetaMask} />
                        </div>

                    </div>
                </header>

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

                                    {contractAddress &&
                                        <p>
                                            {Object.keys(contractAddress)}: &nbsp;
                                            <span>{contractAddress['PTRN contract address']}</span>
                                        </p>
                                    }
                                </div>

                                <div className="section-box-wrapper">

                                    {metaMaskAccount === null && <BoxConnectWallet metaMaskAccount={metaMaskAccount} connectToMetaMask={connectToMetaMask} />}

                                    {metaMaskAccount !== null && boxPtrnBalance === false &&
                                        <BoxPtrnKey
                                            handlecheckBalance={handlecheckBalance}
                                            handlePtrnKeyInputChange={handlePtrnKeyInputChange}
                                        />}

                                    {metaMaskAccount !== null && boxPtrnBalance &&
                                        <BoxPtrnBalance
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

                    {popupError && <PopupErrorMessage handleClosePopupError={handleClosePopupError} message={popupErrorMessage} />}
                </div>

            </div>
        </div>
    );
}

export default App;
