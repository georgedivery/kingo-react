
function BoxPtrnKey({
    handlePtrnKeyInputChange,
    handlecheckBalance,
    handleWithdraw
}) {

    return (
        <div className="section-box section-pathearn-box active" id="ptrn-key">
            <div className="section-box-inner">
                <h3 className="text_center">
                    Enter your PTRN Key
                </h3>

                <div className="form-control">
                    <input type="text" onChange={handlePtrnKeyInputChange} className="field" id="ptrn-key-input" />
                    <span className="error">
                        Please add valid key.
                    </span>
                </div>

                <p className="text_center list-buttons">
                    <button onClick={handlecheckBalance} className="btn  " id="btn-check-balance">
                        CHECK BALANCE
                    </button>

                    {/* <button onClick={handleWithdraw} className="btn btn_small" id="btn-withdraw">
                        WITHDRAW
                    </button> */}
                </p>
            </div>
        </div>
    );
}

export default BoxPtrnKey;
