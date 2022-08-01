
function BoxPtrnBalance({
    handleWithdraw,
    balanceData
}) { 

    let {
        balance_for_next_withdraw,
        pending_withdraw,
        current_fee,
        hours_to_next_payment,
        minutes_to_next_payment
    } = balanceData;
    
    return (
        <>
            {Object.keys(balanceData).length &&
                <div className="section-box section-pathearn-box active" id="ptrn-balance">
                    <div className="section-box-inner">
                        <h3 className="text_center">
                            My PTRN Balance
                        </h3>

                        <div className="withdraws-cols">
                            <div className="col col-1of2">
                                <div className="available-withdraw">
                                    <p>
                                        Available to withdraw
                                    </p>

                                    <p className="price">
                                        <span> {balance_for_next_withdraw.toFixed(3)} ptrn</span>

                                    </p>
                                </div>

                                <div className="pending-withdraw">
                                    <p>
                                        Pending withdraw
                                    </p>

                                    <p className="price">
                                        <span> {pending_withdraw.toFixed(3)} ptrn</span>
                                    </p>
                                </div>

                                <div className="pending-withdraw pending-withdraw-fee ">
                                    <p>
                                        <small> Fee: {current_fee.toFixed(2)}%</small>
                                    </p>


                                </div>
                            </div>

                            <div className="col col-1of2">
                                <div className="time-withdraw">
                                    <p>
                                        Time to next withdraw
                                    </p>

                                    <p>
                                        {hours_to_next_payment}h {minutes_to_next_payment}m
                                    </p>
                                </div>

                                <p className="text_right">
                                    <button onClick={handleWithdraw} className="btn" id="btn-withdraw">
                                        WITHDRAW
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default BoxPtrnBalance;
