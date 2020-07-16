const NuLink = artifacts.require("NuLink.sol");
const NuLinkToken = artifacts.require("NuLinkToken.sol");
const NLINKSwap = artifacts.require("NLINKSwap.sol");

module.exports = async function(deployer) {
    
    await deployer.deploy(NuLink);
    await deployer.deploy(NuLinkToken);

    const nlinkToken = await NuLink.deployed();
    const newlinkToken = await NuLinkToken.deployed();

    await deployer.deploy(NLINKSwap, nlinkToken.address, newlinkToken.address);

    const swapContract = await NLINKSwap.deployed() 
};