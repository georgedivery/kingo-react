
function PopupErrorMessage({
    message,
    handleClosePopupError,
    serverErr
}) {
    return (
        <div className="popup-install-metamask popup-open-metamask popup-error active">
            <div className="popup-content">
                <div className="popup-content-inner">
                    {serverErr
                        ? <h4 className="text_center">
                            Service temporary unavailable.
                        </h4>
                        : <h4 className="text_center">
                            {message}
                        </h4>
                    }
                    {message !== 'Please connect to Polygon network!' &&
                        <p className="text_center">
                            <button onClick={handleClosePopupError} className="btn btn_small close">
                                OK
                            </button>
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default PopupErrorMessage;
