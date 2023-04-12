function RedirectToMetamask({handleClosePopupInstallMetamask}) {
    handleClosePopupInstallMetamask();
    window.location.href = 'https://metamask.app.link/dapp/kingo.ai/ptrn/'; 
};


function PopupInstallMetaMask({
    handleClosePopupInstallMetamask
}) {

    return (
        <RedirectToMetamask handleClosePopupInstallMetamask={handleClosePopupInstallMetamask}/>
    );
}


export default PopupInstallMetaMask;