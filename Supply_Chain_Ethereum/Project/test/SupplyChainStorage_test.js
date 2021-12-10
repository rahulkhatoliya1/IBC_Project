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

      it("Must fail as the calling person don't have the rights( Permision Denied )", async ()=>{
         await this.SupplyChainStorage.setUser(accounts[1],"Rahul Bhai","100","Bande uthana",true,{from:accounts[1]});
      });

      it("Must fail as the calling person don't have the rights( Permision Denied )",async ()=>{
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

      it('User should get added with correct details', async ()=>{
         var SupplyChainStorageContract;
         return SupplyChainStorage.deployed().then(function(instance) {
            SupplyChainStorageContract = instance;
            return instance.setUser(accounts[1], "Name","ContactNo","Role",true);
        }).then(function() {
           
            return SupplyChainStorageContract.getUser.call(accounts[1]);
        }).then(function(result) {
           
            assert.equal("Name", result[0], "Name wasn't properly added");
            assert.equal("ContactNo", result[1], "ContactNo wasn't properly added");
            assert.equal("Role", result[2], "Role wasn't properly added");
            assert.equal(true, result[3], "IsActive wasn't properly added");

         });
     });
   });

});
