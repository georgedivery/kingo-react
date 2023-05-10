
async function addPTRNdata(e) {
    const tokenAddress = e.target.id;
    const tokenImage = "https://kingo.ai/ptrn/static/media/logo-token.a49708e3af153546d68e.jpg";
    const tokenSymbol = tokenAddress === '0x324165Db0A8D41f2eEBb38d68E75Edd5F8f48963' ? "PTRN" : "Unknown";
    const tokenDecimals = 18;
    if (!tokenAddress) {
        return
    };

    try {
        // const tokens = await window.ethereum.request({ method: 'wallet_watchAsset', params: {} });
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20", // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenSymbol === 'PTRN' ? tokenImage : null, // A string url of the token logo
                },
            },
        });
        console.log(wasAdded);
        if (wasAdded) {
            console.log("Asset added");
        } else {
            console.log("Canceled by user!");
        }

    } catch (error) {
        console.log(error);
    }
}

export default addPTRNdata;
