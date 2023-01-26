
function BtnConnectMetaMask({
    onClick,
    metaMaskAccount
}) {
    return (
        <button disabled={metaMaskAccount !== ''} onClick={onClick} className="btn btn-connect-metamask">
            {metaMaskAccount !== '' &&
                <span>{`${metaMaskAccount.substring(0, 3)}...${metaMaskAccount.substr(metaMaskAccount.length - 3)}`}</span>
            }
            {metaMaskAccount === '' &&
                <>Connect</>
            }

        </button>
    );
}

export default BtnConnectMetaMask;
