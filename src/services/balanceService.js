const balanceService = (ptrnKey) => { 

    fetch('https://ptrn-backend.herokuapp.com/api/balance/', {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Upi': ptrnKey
        },
    }).then(response => {
        console.log(response)
        if (!response.ok) {
            setPopupError(true);
            setBalanceData({})
        }

        if (response.ok) {
            setBoxPtrnBalance(true)
        }
        return response.json();
    }).then(data => {
        console.log(data)
        setBalanceData(data)
        setPopupErrorMessage(data)
    }).catch((err) => {
        console.log(err); 
    });
}

export default balanceService;