const swapContract = "0xeBc51ED49F20e82353a264BfE27f014Cb12aD94f";
const oldLinkToken = "0x0a956e5A5b39A4E471a9631d9b9cA96bEf2f6B20";
const newNLINKtoken = "0xdC8eDF5640D357c46da9707F94097C4809313414";

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

    await ethereum.enable();

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
                    res[0],
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
