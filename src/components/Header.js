import { useState, useContext } from 'react';
import { AppContext } from "../context";
import logo from '../assets/images/Kingo-logo-color.png';
import { Link } from "react-router-dom";
import BtnConnectMetaMask from './btnConnectMetaMask';

function Header({ connectToMetaMask }) {
    const [menu, setMenu] = useState(false);
    const { state } = useContext(AppContext);
    const toggleMenu = () => {
        setMenu(!menu);
    }

    return (
        <header className="header">
            <div className="shell">
                <a className="logo" href="https://kingo.ai/">
                    <img src={logo} alt="Kingo Logo" />
                </a>

                <div className={`navigation ${menu ? "open" : null} `} >
                    <div id="navbar" className="menu-top-container">
                        <ul id="menu-top" className="nav">
                            <li id="menu-item-29" className="menu-item">
                            <a href="https://kingo.ai/" className='menu-link' rel="noreferrer"  >Home</a>
                            </li>

                            <li>
                                <a href="https://kingo.ai/instructions/" className='menu-link' rel="noreferrer" target="_blank">Instructions</a>
                            </li>

                            <li>
                                <a href="https://quickswap.exchange/#/swap?swapIndex=0&currency0=0x324165Db0A8D41f2eEBb38d68E75Edd5F8f48963&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F" className='menu-link' rel="noreferrer" target="_blank">swap</a>
                            </li>

                            {state.isInBeneficiaryList && <li>
                                <Link to={'/personal-vesting'}>PERSONAL VESTING</Link>

                            </li>} 
 
                        </ul>
                    </div>

                    <BtnConnectMetaMask metaMaskAccount={state.metaMaskWallet} onClick={connectToMetaMask} /> 
                </div>

                <div onClick={toggleMenu} className={`btn-burger ${menu ? "open" : null} `}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>
        </header>
    );
}

export default Header;
