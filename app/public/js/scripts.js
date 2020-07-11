const swapContract = "0x40520eF420E1D2F64Ae5cA65Bf8A9E3592453Af8";
const oldLinkToken = "0x06Bd752F91b7b07ceec65a34750db271AA975872";
const newNLINKtoken = "0x002C8129cB631C2Fe86a961F82B638E1b43b9215";

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
            contract = web3.eth.contract(res.abi);
            oldNLINK = contract.at(oldLinkToken);

            web3.eth.getAccounts((err, res) => {
                if (!err) console.log(res[0]);
                oldNLINK.balanceOf('0xB63993856679ce3c385F9EF063Ee24B126a9D170', function(err, res) {
                    balance = (res.c / 1000).toFixed(3);
                    $("#current").html("Old NLINK balance: " + balance);
                });                
            });
            
            $("#swap").click(function () {
                ethereum.enable();
                oldNLINK.approve(swapContract, 1000, function (err, res) {
                    if (!err) console.log(res);
                });
                var swapTokens = instance.createSwap(1000, function (err, res) {
                    if (!err) console.log(res);
                });
            });
        });
    });
});
