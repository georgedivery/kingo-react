
function BtnConnectMetaMask({
    onClick,
    metaMaskAccount
}) {
    return (
        <button disabled={metaMaskAccount !== null} onClick={onClick} className="btn btn-connect-metamask">
            {metaMaskAccount !== null &&
                <span>{metaMaskAccount}</span>
            }
            {metaMaskAccount === null &&
                <>Connect</>
            }

        </button>
    );
}

export default BtnConnectMetaMask;
