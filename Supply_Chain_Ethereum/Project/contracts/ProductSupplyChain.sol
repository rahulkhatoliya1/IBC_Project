// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SupplyChainStorage.sol";
import "./Ownable.sol";

contract ProductSupplyChain is Ownable
{
  
    event BuyingRawMaterial(address indexed user, address indexed batchNo);
    event DoneAssembling(address indexed user, address indexed batchNo);
    event DoneInspecting(address indexed user, address indexed batchNo);
    event DonePacking(address indexed user, address indexed batchNo);
    event DoneDelivery(address indexed user, address indexed batchNo);
    
     /* Storage Variables */    
    SupplyChainStorage supplyChainStorage;
    
    /*Modifier*/
    modifier isValidPerformer(address batchNo, string memory role) {
        //keccak256(abi.encodePacked(_text, _num, _addr));
    
        require(keccak256(abi.encodePacked(supplyChainStorage.getUserRole(msg.sender))) == keccak256(abi.encodePacked(role)));
        require(keccak256(abi.encodePacked(supplyChainStorage.getNextAction(batchNo))) == keccak256(abi.encodePacked(role)));
        _;
    }
    
    constructor(address _supplyChainAddress) {
        supplyChainStorage = SupplyChainStorage(_supplyChainAddress);
    }
    
    function getUser(address _batchNo) public returns (string memory name, string memory contactNo , string memory role, bool isActive){
        (name, contactNo, role ,isActive) = supplyChainStorage.getUser(_batchNo);
        return (name, contactNo, role, isActive);
    }
    
    function setUser(address _userAddress,
                      string memory _name, 
                      string memory _contactNo, 
                      string memory _role, 
                     bool _isActive) public onlyOwner returns (bool){
                         
    
        bool status = supplyChainStorage.setUser(_userAddress, _name, _contactNo, _role, _isActive);
        
        return (status);
    }
    
     
    /* Get Next Action  */    

    function getNextAction(address _batchNo) public returns(string memory action)
    {
       (action) = supplyChainStorage.getNextAction(_batchNo);
       return (action);
    }
    
     /* get Retailer */
    
    function getRetailerData(address _batchNo) public returns (string memory registrationNo ,
                                                                     string memory shopName, string memory shopAddress) {
        /* Call Storage Contract */
        (registrationNo,  shopName, shopAddress) =  supplyChainStorage.getRetailerData(_batchNo);  
         
         return (registrationNo,  shopName, shopAddress) ;
 
    }
    
    /* set Retailer */
    
    function setRetailerData(address _batchNo,
                              string memory _registrationNo, string memory _shopName ,string memory _shopAddress) public returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setRetailerData(_batchNo, 
                                                         _registrationNo, 
                                                         _shopName,_shopAddress);  
        
        emit BuyingRawMaterial(msg.sender, _batchNo);
        return (status);
    }
        
     /* get Assembler */
    
    function getAssemblerData(address _batchNo) public returns (string memory expertiseArea,
                                                                            string memory experience) {
        /* Call Storage Contract */
        (expertiseArea, experience) =  supplyChainStorage.getAssemblerData(_batchNo);  
        
         return (expertiseArea, experience);
        
    }
    
    /* set Assembler */
    
    function setAssemblerData(address _batchNo,
                              string memory _expertiseArea, string memory _experience) 
                                public isValidPerformer(_batchNo,'ASSEMBLER') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setAssemblerData(_batchNo, _expertiseArea, _experience);  
        
        emit DoneAssembling(msg.sender, _batchNo);
        return (status);
    }             
    
   
    
    
    /* get Inspector */
    
    function getProductInspectorData(address _batchNo) public returns (string memory typeOfProduct ,string memory serviceChecked) {
        /* Call Storage Contract */
        (typeOfProduct, serviceChecked) = supplyChainStorage.getProductInspectorData(_batchNo);  
        return (typeOfProduct, serviceChecked);
    }
    
    /* set Inspector */
    
    function setProductInspectorData(address _batchNo,
                                     string memory _typeOfProduct,
                                     string memory _serviceChecked) 
                                public isValidPerformer(_batchNo,'INSPECTION') returns(bool) {
        /* Call Storage Contract */
        bool status = supplyChainStorage.setProductInspectorData(_batchNo, _typeOfProduct, _serviceChecked);  
        
        emit DoneInspecting(msg.sender, _batchNo);
        return (status);
    }

    
    /* get packer data */
    
    function getPackerData(address _batchNo) public returns (string memory typeOfProduct, string memory materialUsed) {
        /* Call Storage Contract */
        (typeOfProduct, materialUsed) =  supplyChainStorage.getPackerData(_batchNo);  
        return  (typeOfProduct, materialUsed);
    }
    
    /* set packer data */
    
    function setPackerData(address _batchNo,
                               string memory _typeOfProduct,
                               string memory _materialUsed) 
                                public isValidPerformer(_batchNo,'PACKAGING') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setPackerData(_batchNo, _typeOfProduct, _materialUsed);  
        
        emit DonePacking(msg.sender, _batchNo);
        return (status);
    }
    
    /* get delivery data */
    
    function getDelivererData(address _batchNo) public returns (string memory typeOfProduct,
                                                                                            string memory vehicalUsed) {
        /* Call Storage Contract */
       (typeOfProduct , vehicalUsed) =  supplyChainStorage.getDeliverData(_batchNo);  
        
        return (typeOfProduct , vehicalUsed);
    }
    
    /* set delivery data */
    
    function setDeliverData(address _batchNo,
                               string memory _typeOfProduct,
                               string memory _vehicalUsed) 
                                public isValidPerformer(_batchNo,'DELIVERY') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setDeliverData(_batchNo, _typeOfProduct,_vehicalUsed);  
        
        emit  DoneDelivery(msg.sender, _batchNo);
        return (status);
    }
}
