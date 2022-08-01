
function PopupOpenMetaMask({
    handleClosePopupOpenMetaMask
}) {
    return (
        <div className="popup-install-metamask popup-open-metamask active">
            <div className="popup-content">
                <div className="popup-content-inner">
                    <h4 className="text_center">
                        Please Open MetaMask!
                    </h4>

                    <p className="text_center">
                        <button onClick={handleClosePopupOpenMetaMask} className="btn btn_small close">
                            OK
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PopupOpenMetaMask;
