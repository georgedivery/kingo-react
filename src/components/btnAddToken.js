function BtnAddToken({
    addToken,
    contractAddress
}) {
    
    return (
        <button id={contractAddress?contractAddress:''} onClick={addToken} className="btn btn-connect-metamask">
                Add PTRN to Metamask
        </button>
    );
}

export default BtnAddToken;