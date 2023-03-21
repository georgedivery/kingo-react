import Header from '../components/Header';
import { useEffect, useRef, useContext, useState } from 'react';
import pathearnLogo from '../assets/images/Image-7.png';
import backgroundImage from '../assets/images/Rectangle-1508.jpg';
import { useNavigate } from "react-router-dom";
import { getBeneficiary } from '../services/smartActions';
import { getSymbol } from '../services/smartActions';
import { releaseAmaunt } from '../services/smartActions';
import { changeBeneficiaryWallet } from '../services/smartActions';
import { checkWallet } from '../services/smartActions';
import PageLoader from '../components/pageLoader';

import { AppContext } from "../context";

function PersonalVestingPage() {
    const { state, dispatch } = useContext(AppContext);
    const [metaMaskAccount, setMetaMaskAccount] = useState(state.metaMaskWallet);
    const [beneficiary, setBeneficiary] = useState();
    const [contractSymbol, setContractSymbol] = useState();
    const inputRef = useRef(null);
    const [widgetCheckAddress, setWidgetCheckAddress] = useState(false);
    const [hasAmountToWithraw, setHasAmountToWithraw] = useState(false);
    const [changeWalletLoader, setChangeWalletLoader] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (state.isInBeneficiaryList === false) {
            navigate("/");
        }
    }, [state.isInBeneficiaryList])

    useEffect(() => {

        if (window.ethereum.chainId !== '0x89') {
            navigate("/");
        }
    }, [])


    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('chainChanged', function (networkId) {
                console.log(networkId)
                setTimeout(() => {
                    if (networkId !== '0x89') {
                        navigate("/");
                    }
                }, 10)
            })

            window.ethereum.on('accountsChanged', function (accounts) {
                console.log('accountsChanged')
                setMetaMaskAccount(accounts[0])
                dispatch({ type: "METAMASK_WALLET", payload: accounts[0] });
                checkBeneficiary(accounts[0]);
            })
        }
    }, [])

    const checkBeneficiary = (metaMaskAccount) => {
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
        })
    }

    const handleChangeBeneficiaryWallet = () => {
        const newWallet = inputRef.current.value
        checkWallet(newWallet).then(res => {
            if (!res) {
                setWidgetCheckAddress(true)
            } else {
                setWidgetCheckAddress(false)
                changeBeneficiaryWallet(metaMaskAccount, newWallet)
                    .then(res => {
                        setChangeWalletLoader(false)
                    }).catch(err => {
                        console.log(err)
                        setChangeWalletLoader(false)
                    })
            }
        })
    }


    const handleWithdraw = () => {
        setPageLoader(true)
        releaseAmaunt(metaMaskAccount).then(res => {
            console.log(res)
            window.location.reload()
            setPageLoader(false)
        }).catch(err => {
            console.log(err)
            window.location.reload()
            setPageLoader(false)
        })
    }

    useEffect(() => {
        if (metaMaskAccount) {
            getSymbol(metaMaskAccount).then(res => {
                setContractSymbol(res)
            })

            getBeneficiary(metaMaskAccount).then(res => {
                const approved = res.some(x => {
                    const date = new Date(x[1] * 1000);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today && x[3] === '1' && x[2] === '0';
                })
                
                if (approved) {
                    setHasAmountToWithraw(true)
                } else { 
                    setHasAmountToWithraw(false)
                }

                const formattedRes = res.map(x => {
                    const amount = x[0] / 10 ** 18
                    const date = new Date(x[1] * 1000).toLocaleDateString();
                    const withdrawn = `${x[2] === '0' ? "No" : "Yes"}`
                    const approved = `${x[3] === '0' ? "No" : "Yes"}`

                    return [amount, date, withdrawn, approved]
                })
                setBeneficiary(formattedRes)
            })
        }
    }, [metaMaskAccount])

    return (
        <div className="App">
            <div className="wrapper">
                <Header />

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
                                </div>

                                <div className="section-box-wrapper">

                                    <div className="section-box section-pathearn-box active" >
                                        <div className="section-box-inner">
                                            <h3 className="text_center">
                                                Personal Vesting
                                            </h3>

                                            <div className="personal-vesting-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Amount</th>
                                                            <th>Date</th>
                                                            <th>Withdrawn</th>
                                                            <th>Approved</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {beneficiary &&
                                                            <>
                                                                {beneficiary.map((x, i) => {
                                                                    return <tr key={i}>
                                                                        <td>{x[0].toFixed(3) + ' ' + contractSymbol}</td>
                                                                        <td>{x[1]}</td>
                                                                        <td>{x[2]}</td>
                                                                        <td>{x[3]}</td>
                                                                    </tr>
                                                                })}
                                                            </>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="section-withdraw">
                                                {hasAmountToWithraw &&
                                                    <button onClick={handleWithdraw} className="btn btn-withdraw">
                                                        withdraw
                                                    </button>
                                                }

                                            </div>

                                            <div className="section-change-wallet">
                                                <h3 className="text_center">
                                                    Change Beneficiary Wallet
                                                </h3>

                                                <p className='current-wallet' >Your current wallet is: <span>{state.metaMaskWallet}</span></p>
                                                <p className='current-wallet mobile' >Your current wallet is:


                                                    <span>{`${state.metaMaskWallet.substring(0, 5)}...${state.metaMaskWallet.substr(state.metaMaskWallet.length - 5)}`}</span>
                                                </p>

                                                <div className="widget-change-wallet-address">
                                                    <input className='field' placeholder='Enter new wallet address' ref={inputRef} type="text" id="new-wallet-address" />

                                                    <button className="btn" onClick={handleChangeBeneficiaryWallet}>
                                                        {changeWalletLoader && <div className="loader"></div>}
                                                        {!changeWalletLoader && <>Change</>}

                                                    </button>

                                                    {widgetCheckAddress &&
                                                        <p>Please enter valid address!</p>
                                                    }
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>


                </div>

                {pageLoader && <PageLoader />}

            </div>
        </div>
    );
}

export default PersonalVestingPage;
