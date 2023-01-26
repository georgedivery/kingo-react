
function BoxPtrnKey({
    handlePtrnKeyInputChange,
    handlecheckBalance,
    balanceLoader,
    errPtrnKey
}) {

    return (
        <div className="section-box section-pathearn-box active" id="ptrn-key">
            <div className="section-box-inner">
                <h3 className="text_center">
                    Enter your PTRN Key
                </h3>

                <div className="form-control">
                    <input type="text" onChange={handlePtrnKeyInputChange} className="field" id="ptrn-key-input" />
                    {errPtrnKey &&
                        <span className="error">
                            Please add valid key.
                        </span>
                    }
                </div>

                <p className="text_center list-buttons">
                    <button disabled={balanceLoader} onClick={handlecheckBalance} className="btn  " id="btn-check-balance">
                        {balanceLoader && <div className="loader"></div>}
                        {!balanceLoader && <>CHECK BALANCE</>}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default BoxPtrnKey;
