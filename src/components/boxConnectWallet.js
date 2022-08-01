import BtnConnectMetaMask from './btnConnectMetaMask'

function BoxConnectWallet({
    connectToMetaMask,
    metaMaskAccount
}) {


    return (
        <div className="section-box section-pathearn-box active" id="connect-box">
            <div className="section-box-inner">
                <h3 className="text_center">
                    Connect your wallet to continue
                </h3>

                <p className="text_center">
                    <BtnConnectMetaMask metaMaskAccount={metaMaskAccount} onClick={connectToMetaMask} />
                </p>
            </div>
        </div>
    );
}

export default BoxConnectWallet;
