
function PopupInstallMetaMask({
    handleClosePopupInstallMetamask
}) {


    return (
        <div className="popup-install-metamask active">
            <div className="popup-content">
                <div className="popup-content-inner">
                    <h4 className="text_center">
                        Please Install MetaMask!
                    </h4>

                    <p className="text_center">
                        <button onClick={handleClosePopupInstallMetamask} className="btn btn_small close">
                            OK
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PopupInstallMetaMask;
