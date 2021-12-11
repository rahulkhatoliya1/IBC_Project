const SupplyChainStorage = artifacts.require('SupplyChainStorage');
const SupplyChainUser = artifacts.require('SupplyChainUser');
const truffleAssert = require('truffle-assertions');

require('chai').should();

contract("SupplyChainUser",(accounts)=>{
   beforeEach(async ()=> {
      this.SupplyChainStorage = await SupplyChainStorage.new();
      this.SupplyChainUser    = await SupplyChainUser.new(SupplyChainStorage.address);
   })

   describe("Checking Attributes",()=>{
      it("Checking SupplyChainStorage address",async ()=>{
      	 const  name = await this.SupplyChainUser.supplyChainStorage();
         assert.equal(SupplyChainStorage.address, name, "supplyChainStorage contract address wasn't properly added");
      })
   });
   
});
