const SupplyChainStorage = artifacts.require('SupplyChainStorage');
const SupplyChainStorageOwnable = artifacts.require('SupplyChainStorageOwnable');
const truffleAssert = require('truffle-assertions');

require('chai').should();

contract('SupplyChainStorage',(accounts)=>{

   beforeEach(async ()=> {
      this.SupplyChainStorage = await SupplyChainStorage.new();
   })

 
   describe('SupplyChainStorage attributes',()=>{
       it('owner should equal to accounts[0] value',async ()=>{
          const  name = await this.SupplyChainStorage.owner();
          name.should.equal(accounts[0]);
        })
   })

   describe('Checking Authorized Caller Function',()=>{
      it('Set user should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true,{from:accounts[1]});
      });

      it('Set user should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true,{from:accounts[1]});
      });

      it("Unauthorization of accounts[1] should be done and thus it should not able to call set user hence failing should be done",async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.deAuthorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true,{from:accounts[1]});
      })

      it("Authorized Caller event should be emitted",async ()=>{
         let result =  await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         truffleAssert.eventEmitted(result, 'AuthorizedCaller', (event) =>{
               return event.caller == accounts[1];
         });
      })

      it("DeAuthorized Caller event should be emitted",async ()=>{
         let result =  await this.SupplyChainStorage.deAuthorizeCaller(accounts[0]);
         truffleAssert.eventEmitted(result, 'DeAuthorizedCaller', (event) =>{
               return event.caller == accounts[0];
         });
      })
   });

   describe('Checking Set User Function',()=>{
      it('Set user should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true,{from:accounts[1]});
      });

      it('Set user should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true,{from:accounts[1]});
      });

      it('Checking set user should return true', async ()=>{
         const res = await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true)
         res.should.equal(true);
      });

   });



});
   /*
   describe('Changing Ownership',()=>{
        it('Owner should change',async ()=>{
          await this.Ownable.transferOwnership(accounts[1]);
          const newOwner = await this.Ownable.owner();
          newOwner.should.equal(accounts[1]);
        })
      
        it("Chaning of owner should be done with same accounts",async ()=>{
           await this.Ownable.transferOwnership(accounts[1]);
          const newOwner = await this.Ownable.owner();
          newOwner.should.equal(accounts[1]);
          await this.Ownable.transferOwnership(accounts[0],{from:accounts[1]});
          const Owner = await this.Ownable.owner();
          Owner.should.equal(accounts[0]);
        })

        it("Must fail as the calling person don't have the rights( Permision Denied )",async ()=>{
           await this.Ownable.transferOwnership(accounts[1]);
            const newOwner = await this.Ownable.owner();
            newOwner.should.equal(accounts[1]);
            await this.Ownable.transferOwnership(accounts[0],{from:accounts[0]}) 
         
        })

        it("Checking event results in changing owner",async ()=>{
            let result =  await this.Ownable.transferOwnership(accounts[1]);
            truffleAssert.prettyPrintEmittedEvents(result);
            truffleAssert.eventEmitted(result, 'OwnershipTransferred', (event) =>{
               return event.oldOwner == accounts[0] && event.newOwner == accounts[1];
            });
        })
    })
     
   describe("Checking renounceOwnership" ,()=>{
        it ("Checking event results in owner renouncing",async ()=>{
            let result =  await this.Ownable.renounceOwnership();
            truffleAssert.eventEmitted(result, 'OwnershipRenounced', (event) =>{
               return event.oldOwner == accounts[0]
            });
        })

        it("Ownwership renouncing should be done with same accounts",async ()=>{
           await this.Ownable.renounceOwnership();
        })

         it("Must fail as the calling person don't have the rights( Permision Denied )",async ()=>{
             await this.Ownable.renounceOwnership({from:accounts[1]});
        })

         it("Ownership must change", async () =>{
            await this.Ownable.renounceOwnership();
            const  name = await this.Ownable.owner();
            name.should.not.equal(accounts[0]);
         })

   })


   */

