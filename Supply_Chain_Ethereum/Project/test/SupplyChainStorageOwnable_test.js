const SupplyChainStorageOwnable = artifacts.require('SupplyChainStorageOwnable');
const truffleAssert = require('truffle-assertions');

require('chai').should();

contract('SupplyChainStorageOwnable',(accounts)=>{

   beforeEach(async ()=> {
      this.SupplyChainStorageOwnable = await SupplyChainStorageOwnable.new();
   })

   describe('SupplyChainStorageOwnable attributes',()=>{
       it('owner should equal to accounts[0] value',async ()=>{
          const  name = await this.SupplyChainStorageOwnable.owner();
          name.should.equal(accounts[0]);
        })
   })

   describe('Changing Ownership',()=>{
        it('owner should change',async ()=>{
          await this.SupplyChainStorageOwnable.transferOwnership(accounts[1]);
          const newOwner = await this.SupplyChainStorageOwnable.owner();
          newOwner.should.equal(accounts[1]);
        })
      
        it("Chaning of owner should be done with same accounts",async ()=>{
           await this.SupplyChainStorageOwnable.transferOwnership(accounts[1]);
          const newOwner = await this.SupplyChainStorageOwnable.owner();
          newOwner.should.equal(accounts[1]);
          await this.SupplyChainStorageOwnable.transferOwnership(accounts[0],{from:accounts[1]});
          const Owner = await this.SupplyChainStorageOwnable.owner();
          Owner.should.equal(accounts[0]);
        })

        it("Must fail as the calling person don't have the rights( Permision Denied )",async ()=>{
           await this.SupplyChainStorageOwnable.transferOwnership(accounts[1]);
            const newOwner = await this.SupplyChainStorageOwnable.owner();
            newOwner.should.equal(accounts[1]);
            await this.SupplyChainStorageOwnable.transferOwnership(accounts[0],{from:accounts[0]}) 
         
        })

        it("Checking event results in changing owner",async ()=>{
            let result =  await this.SupplyChainStorageOwnable.transferOwnership(accounts[1]);
            truffleAssert.prettyPrintEmittedEvents(result);
            truffleAssert.eventEmitted(result, 'OwnershipTransferred', (event) =>{
               return event.oldOwner == accounts[0] && event.newOwner == accounts[1];
            });
        })
    })
     
   describe("Checking renounceOwnership" ,()=>{
        it ("Checking event results in owner renouncing",async ()=>{
            let result =  await this.SupplyChainStorageOwnable.renounceOwnership();
            truffleAssert.eventEmitted(result, 'OwnershipRenounced', (event) =>{
               return event.oldOwner == accounts[0]
            });
        })

        it("Ownwership renouncing should be done with same accounts",async ()=>{
           await this.SupplyChainStorageOwnable.renounceOwnership();
        })

         it("Must fail as the calling person don't have the rights( Permision Denied )",async ()=>{
             await this.SupplyChainStorageOwnable.renounceOwnership({from:accounts[1]});
        })

         it("Ownership must change", async () =>{
            await this.SupplyChainStorageOwnable.renounceOwnership();
            const  name = await this.SupplyChainStorageOwnable.owner();
            name.should.not.equal(accounts[0]);
         })

   })

});