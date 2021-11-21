const Ownable = artifacts.require('Ownable');
const truffleAssert = require('truffle-assertions');

require('chai').should();

contract('Ownable',(accounts)=>{

   beforeEach(async ()=> {
      this.Ownable = await Ownable.new();
   })

   describe('Ownable attributes',()=>{
       it('owner should equal to accounts[0] value',async ()=>{
          const  name = await this.Ownable.owner();
          name.should.equal(accounts[0]);
        })
   })

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




});