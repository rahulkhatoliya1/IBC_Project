const Ownable                   = artifacts.require("Ownable");
const SupplyChainStorageOwnable = artifacts.require("SupplyChainStorageOwnable");
const ProductSupplyChain        = artifacts.require("ProductSupplyChain");
const SupplyChainUser           = artifacts.require("SupplyChainUser");
const SupplyChainStorage        = artifacts.require("SupplyChainStorage");
module.exports =  async (deployer)=>{
  deployer.deploy(Ownable);
  deployer.deploy(SupplyChainStorageOwnable);
  deployer.deploy(SupplyChainStorage);
  deployer.deploy(ProductSupplyChain,SupplyChainStorage.address);
  deployer.deploy(SupplyChainUser,SupplyChainStorage.address);
};
