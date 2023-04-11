function NotMetamaskMessage({ message, handleClosePopupInstallMetamask }) {
    return (
        <div className="popup_install_metamask active">
            <div className="popup_content">
                <div className="popup_content_inner">
                    <h4 className="text_center">{message}</h4>
                    <div className="btn_container">
                        <button
                            onClick={handleClosePopupInstallMetamask}
                            className="btn btn_small close"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RedirectToMetamask({handleClosePopupInstallMetamask}) {
    handleClosePopupInstallMetamask();
    window.location.href = 'https://metamask.app.link/dapp/kingo.ai/ptrn/'; 
  };

function PopupInstallMetaMask({ handleClosePopupInstallMetamask, message }) {

    return (
        <>
            {message !== "Please intall MetaMask!"?
            <NotMetamaskMessage
                    handleClosePopupInstallMetamask={
                        handleClosePopupInstallMetamask
                    }
                    message={message}
                />:<RedirectToMetamask handleClosePopupInstallMetamask={handleClosePopupInstallMetamask}/>
            }
        </>
    );
}

export default PopupInstallMetaMask;
