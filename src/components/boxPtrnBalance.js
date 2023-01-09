import { useEffect, useState } from 'react';
import getPrice from '../services/getPrice';

function BoxPtrnBalance({
    handleWithdraw,
    balanceData,
    withdrawLoader,
}) {



    let {
        balance_for_next_withdraw,
        pending_withdraw,
        current_fee,
        hours_to_next_payment,
        minutes_to_next_payment
    } = balanceData;

    const [price, setPrice] = useState(balance_for_next_withdraw)
    const [priceToWithdraw, setPriceToWithdraw] = useState(pending_withdraw)
    const [priceSymbols, setPriceSymbols] = useState('')
    const [toDolar, setToDolar] = useState(null)

    useEffect(() => {
        getPrice().then(res => {
            let price = res.data.current_price * balance_for_next_withdraw
            let priceToWithdraw = res.data.current_price * pending_withdraw
            setPrice(price)
            setToDolar(res.data.current_price)
            setPriceToWithdraw(priceToWithdraw)
            setPriceSymbols(res.data.currency)
        }).catch(err => {
            console.log(err)
            setPrice(0)
            setPriceToWithdraw(0)
        })
    })
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
                                        <span> {balance_for_next_withdraw.toFixed(6)} ptrn</span>
                                    </p>
                                    {price !== 0 &&
                                        <>
                                            <p className="price price_to_dolar">
                                                <span> {priceSymbols} {price.toFixed(6)}</span>
                                            </p>

                                            {toDolar !== null &&
                                                <p className="price price_to_dolar">
                                                    <span> RATE PTRN/{priceSymbols} = {toDolar.toFixed(6)}  </span>
                                                </p>}
                                        </>
                                    }



                                </div>

                                <div className="pending-withdraw">
                                    <p>
                                        Pending withdraw
                                    </p>

                                    <p className="price">
                                        <span> {pending_withdraw.toFixed(6)} ptrn</span>
                                    </p>

                                    {priceToWithdraw !== 0 &&
                                        <>
                                            <p className="price price_to_dolar">
                                                <span> {priceSymbols} {priceToWithdraw.toFixed(6)}</span>
                                            </p>

                                            {toDolar !== null &&
                                                <p className="price price_to_dolar">
                                                    <span> RATE PTRN/{priceSymbols} = {toDolar.toFixed(6)}  </span>
                                                </p>}
                                        </>
                                    }


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
                                    <button onClick={handleWithdraw} disabled={withdrawLoader || balance_for_next_withdraw <= 0 || pending_withdraw > 0} className="btn" id="btn-withdraw">
                                        {withdrawLoader && <div className="loader"></div>}
                                        {!withdrawLoader && <>WITHDRAW</>}
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
