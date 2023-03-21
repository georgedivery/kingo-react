
function BtnConnectMetaMask({
    onClick,
    metaMaskAccount
}) {
    
    return (
        <button disabled={metaMaskAccount !== undefined && metaMaskAccount !== ''} onClick={onClick} className="btn btn-connect-metamask">
            {(metaMaskAccount !== undefined && metaMaskAccount !== '')  &&
                <span>{`${metaMaskAccount.substring(0, 3)}...${metaMaskAccount.substr(metaMaskAccount.length - 3)}`}</span>
            }
            {(metaMaskAccount === undefined || metaMaskAccount === '') &&
                <>Connect</>
            }

        </button>
    );
}

export default BtnConnectMetaMask;
