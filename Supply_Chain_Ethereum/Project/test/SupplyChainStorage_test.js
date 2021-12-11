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
          assert.equal(accounts[0], name, "Owner wasn't properly added");
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


    describe('Checking Set&Get Retailer Function',()=>{
      it('Set Retailer should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setRetailerData(accounts[1],"Rahul Bhai","100","Bande uthana",{from:accounts[1]});
      });

      it('Set Retailer should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setRetailerData(accounts[1],"Rahul Bhai","100","Bande uthana",{from:accounts[1]});
      });

      it('Retailer should get added with correct details', async ()=>{
         var SupplyChainStorageContract;
         return SupplyChainStorage.deployed().then(function(instance) {
            SupplyChainStorageContract = instance;
            return instance.setRetailerData(accounts[1],"RegistrationNo","ShopName","ShopAddress");
        }).then(function() {
           
            return SupplyChainStorageContract.getRetailerData.call(accounts[1]);
        }).then(function(result) {
           
            assert.equal("RegistrationNo",result[0], "RegistrationNo wasn't properly added");
            assert.equal("ShopName", result[1], "ShopName wasn't properly added");
            assert.equal("ShopAddress", result[2], "ShopAddress wasn't properly added");

         });
     });
   });

   describe('Checking Set&Get Assembler Function',()=>{
      it('Set Assembler should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setAssemblerData(accounts[1],"Expertise","Experience",{from:accounts[1]});
      });

      it('Set Assembler should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setAssemblerData(accounts[1],"Expertise","Experience",{from:accounts[1]});
      });

      it('Assembler should get added with correct details', async ()=>{
         var SupplyChainStorageContract;
         return SupplyChainStorage.deployed().then(function(instance) {
            SupplyChainStorageContract = instance;
            return instance.setAssemblerData(accounts[1],"Expertise","Experience");
        }).then(function() {
           
            return SupplyChainStorageContract.getAssemblerData.call(accounts[1]);
        }).then(function(result) {
           
            assert.equal("Expertise",result[0], "Expertise wasn't properly added");
            assert.equal("Experience", result[1], "Experience wasn't properly added");
           
         });
     });
   });

   describe('Checking Set&Get ProductInspector Function',()=>{
      it('Set ProductInspector should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setProductInspectorData(accounts[1],"Type","Checked",{from:accounts[1]});
      });

      it('Set ProductInspector should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setProductInspectorData(accounts[1],"Type","Checked",{from:accounts[1]});
      });

      it('ProductInspector should get added with correct details', async ()=>{
         var SupplyChainStorageContract;
         return SupplyChainStorage.deployed().then(function(instance) {
            SupplyChainStorageContract = instance;
            return instance.setProductInspectorData(accounts[1],"Type","Checked");
        }).then(function() {
           
            return SupplyChainStorageContract.getProductInspectorData.call(accounts[1]);
        }).then(function(result) {
           
            assert.equal("Type",result[0], "Type wasn't properly added");
            assert.equal("Checked", result[1], "Checked wasn't properly added");
           
         });
     });
   });

   describe('Checking Set&Get PackerData Function',()=>{
      it('Set PackerData should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setPackerData(accounts[1],"Type","Material",{from:accounts[1]});
      });

      it('Set PackerData should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setPackerData(accounts[1],"Type","Material",{from:accounts[1]});
      });

      it('PackerData should get added with correct details', async ()=>{
         var SupplyChainStorageContract;
         return SupplyChainStorage.deployed().then(function(instance) {
            SupplyChainStorageContract = instance;
            return instance.setPackerData(accounts[1],"Type","Material");
        }).then(function() {
           
            return SupplyChainStorageContract.getPackerData.call(accounts[1]);
        }).then(function(result) {
           
            assert.equal("Type",result[0], "Type wasn't properly added");
            assert.equal("Material", result[1], "Material wasn't properly added");
           
         });
     });
   });
   
   describe('Checking Set&Get DeliverData Function',()=>{
      it('Set DeliverData should be called by new Authorized caller', async ()=>{
         await this.SupplyChainStorage.authorizeCaller(accounts[1]);
         await this.SupplyChainStorage.setDeliverData(accounts[1],"Type","Vehical",{from:accounts[1]});
      });

      it('Set DeliverData should not be called by unAuthorized caller', async ()=>{
         await this.SupplyChainStorage.setDeliverData(accounts[1],"Type","Vehical",{from:accounts[1]});
      });

      it('DeliverData should get added with correct details', async ()=>{
         var SupplyChainStorageContract;
         return SupplyChainStorage.deployed().then(function(instance) {
            SupplyChainStorageContract = instance;
            return instance.setDeliverData(accounts[1],"Type","Vehical");
        }).then(function() {
           
            return SupplyChainStorageContract.getDeliverData.call(accounts[1]);
        }).then(function(result) {
           
            assert.equal("Type",result[0], "Type wasn't properly added");
            assert.equal("Vehical", result[1], "Vehical wasn't properly added");
           
         });
     });
   });



});
