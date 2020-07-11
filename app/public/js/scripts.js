const swapContract = "0x1D2029E1222a1B5A8Cb0a90d5EaD38bbE3585Be2";
const oldLinkToken = "0xFa419EBCAeafa517D01C69809A3b259bC234c182";
const newNLINKtoken = "0x7A7E91Dd17baA8fc8439780AF215E16a395F14a6";

var contract;
var instance;
var oldNLINK;

window.addEventListener("load", async () => {
    var account;

    if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        console.log(web3);

        web3.eth.getAccounts((err, res) => {
            if (err) console.log(error);
            account = res[0];
        });
    }

    $(function () {
        var data = $.ajax({
            url: "js/NLINKSwap.json",
            dataType: "json",
        });

        var oldNLINKdata = $.ajax({
            url: "js/NuLink.json",
            dataType: "json",
        });

        var newNLINKdata = $.ajax({
            url: "js/NewLink.json",
            dataType: "json",
        });

        $.when(data).done(function (res, status, resp) {
            contract = web3.eth.contract(res.abi);
            instance = contract.at(swapContract);
        });

        $.when(newNLINKdata).done(function (res, status, resp) {
            contract = web3.eth.contract(res.abi);
            newLINK = contract.at(newNLINKtoken);
        });

        $.when(oldNLINKdata).done(function (res, status, resp) {
            var balance;

            contract = web3.eth.contract(res.abi);
            oldNLINK = contract.at(oldLinkToken);
            



            web3.eth.getAccounts((err, res) => {
                if (!err) console.log(res[0]);
                oldNLINK.balanceOf(
                    "0xB63993856679ce3c385F9EF063Ee24B126a9D170",
                    function (err, res) {
                        balance = (res.c / 1000).toFixed(3);
                        $("#current").html("Old NLINK balance: " + balance);

                        balance = balance * 1000;

                        oldNLINK.approve(swapContract, balance, function (err, res) {
                            if (!err) console.log(res);
                        });
                    }
                );
            });

            $("#swap").click(function () {
                ethereum.enable();

                var swapTokens = instance.createSwap(balance, function (err, res) {
                    if (!err) console.log(res);
                });
            });
        });
    });
});
