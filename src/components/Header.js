import { useContext } from 'react';
import { AppContext } from "../context";
import logo from '../assets/images/Kingo-logo-color.png';
import { Link } from "react-router-dom";
import BtnConnectMetaMask from './btnConnectMetaMask';

function Header({ connectToMetaMask }) {
    const { state } = useContext(AppContext); 
    // console.log(state)

    return (
        <header className="header">
            <div className="shell">
                <a className="logo" href="https://kingo.ai/"> 
                    <img src={logo} alt="Kingo Logo" />
                </a>

                <div className="navigation">
                    <div id="navbar" className="menu-top-container">
                        <ul id="menu-top" className="nav">
                            <li id="menu-item-29" className="menu-item">
                                <Link to={'/'}>Home</Link> 
                            </li>

                            <li>
                                <a href="https://kingo.ai/instructions/" className='menu-link' rel="noreferrer" target="_blank">Instructions</a>
                            </li>

                            {state.isInBeneficiaryList && <li>
                                <Link to={'/personal-vesting'}>PERSONAL VESTING</Link>

                            </li>}
                        </ul>
                    </div>

                    <BtnConnectMetaMask metaMaskAccount={state.metaMaskWallet} onClick={connectToMetaMask} />

                </div>

            </div>
        </header>
    );
}

export default Header;
