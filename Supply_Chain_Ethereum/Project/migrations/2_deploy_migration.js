const Ownable = artifacts.require("Ownable");
const SupplyChainStorageOwnable = artifacts.require("SupplyChainStorageOwnable");
module.exports = function (deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(SupplyChainStorageOwnable);
};
