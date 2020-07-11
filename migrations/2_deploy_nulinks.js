const NuLink = artifacts.require("NuLink.sol");
const NewLink = artifacts.require("NewLink.sol");
const NLINKSwap = artifacts.require("NLINKSwap.sol");

module.exports = async function(deployer) {
    
    await deployer.deploy(NuLink);
    await deployer.deploy(NewLink);

    const nlinkToken = await NuLink.deployed();
    const newlinkToken = await NewLink.deployed();

    await deployer.deploy(NLINKSwap, nlinkToken.address, newlinkToken.address);

    const swapContract = await NLINKSwap.deployed() 
};