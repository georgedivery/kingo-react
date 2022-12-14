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

    const [metaMaskAccount, setMetaMaskAccount] = useState(null);
    const [ptrnKey, setPtrnKey] = useState(null);
    const [popupInstallMetamask, setPopupInstallMetamask] = useState(false);
    const [popupError, setPopupError] = useState(false);
    const [popupErrorMessage, setPopupErrorMessage] = useState('');
    const [popupOpenlMetamask, setPopupOpenlMetamask] = useState(false);
    const [boxPtrnBalance, setBoxPtrnBalance] = useState(false);
    const [balanceData, setBalanceData] = useState({});
    const [contractAddress, setContractAddress] = useState();
    const [serverErr, setServerErr] = useState(false);

    useEffect(() => {
        getContractAddress()
            .then(res => {
                setContractAddress(res.data)

                if (res.status === 503) {
                    setServerErr(true)
                }
            })
            .catch(err => {
                setServerErr(true)
            })
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

                            <a href="https://kingo.ai/instructions/" className='menu-link' target="_blank" rel="noreferrer" >Instructions</a>

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

                                    {contractAddress && !serverErr &&
                                        <p>
                                            {Object.keys(contractAddress)}: &nbsp;
                                            <span>{contractAddress['PTRN contract address']}</span>
                                        </p>
                                    }

                                    {serverErr &&
                                        <p>
                                            Service temporary unavailable.
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

                    {popupError && <PopupErrorMessage handleClosePopupError={handleClosePopupError} serverErr={serverErr} message={popupErrorMessage} />}
                </div>

            </div>
        </div>
    );
}

export default App;
