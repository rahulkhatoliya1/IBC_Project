// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SupplyChainStorageOwnable.sol";

contract SupplyChainStorage is SupplyChainStorageOwnable {
    
    address public lastAccess;
    constructor() {
        authorizedCaller[msg.sender] = 1;
        emit AuthorizedCaller(msg.sender);
    }
    
    /* Events */
    event AuthorizedCaller(address caller);
    event DeAuthorizedCaller(address caller);
    
    /* Modifiers */
    
    modifier onlyAuthCaller(){
        lastAccess = msg.sender;
        require(authorizedCaller[msg.sender] == 1);
        _;
    }
    
    /* User Related */
    struct Person {
        string name;
        string contactNo;
        bool isActive;
    }
    
    struct Retailer{
        string registrationNo;
        string shopName;
        string shopAddress;
    }

    struct ProductInspector{
        string typeOfProduct;
        string serviceChecked;
    }
    
    struct Packer{
        string typeOfProduct;
        string materialUsed;
    }
    
    struct Deliver{
        string typeOfProduct;
        string vehicalUsed;
    }
    
    struct Assembler{
        string expertiseArea;
        string experience;
    }

    mapping(address => Person) userDetails;
    mapping(address =>  string) userRole;
    
    /* Caller Mapping */
    mapping(address => uint8) authorizedCaller;

    
    /* authorize caller */
    function authorizeCaller(address _caller) public onlyOwner returns(bool) {
        authorizedCaller[_caller] = 1;
        emit AuthorizedCaller(_caller);
        return true;
    }
    
    // /* deauthorize caller */
    function deAuthorizeCaller(address _caller) public onlyOwner returns(bool) {
        authorizedCaller[_caller] = 0;
        emit DeAuthorizedCaller(_caller);
        return true;
    }
    
    /*User Roles
        
    */
    
    /* Process Related */

    mapping (address => ProductInspector) batchProductInspector;
    mapping (address => Assembler) batchAssembler;
    mapping (address => Packer) batchPacker;
    mapping (address => Deliver) batchDeliver;
    mapping (address => Retailer) batchRetailer;
    mapping (address =>  string) nextAction;
    
    /*Initialize struct pointer*/
    Person userDetail;
    ProductInspector productInspectorData;
    Packer packerData;
    Deliver deliverData;
    Assembler assemblerData;
    Retailer retailerData;
    
    
    
    /* Get User Role */
    function getUserRole(address _userAddress) public onlyAuthCaller returns( string memory){
        return userRole[_userAddress];
    }
    
    /* Get Next Action  */    
    function getNextAction(address _batchNo) public onlyAuthCaller returns( string memory){
        return nextAction[_batchNo];
    }
        
    /*set user details*/
    function setUser(address _userAddress,
                      string memory _name, 
                      string memory _contactNo, 
                      string memory _role, 
                     bool _isActive) public onlyAuthCaller returns(bool){
        
        /*store data into struct*/
        userDetail.name = _name;
        userDetail.contactNo = _contactNo;
        userDetail.isActive = _isActive;
        
        /*store data into mapping*/
        userDetails[_userAddress] = userDetail;
        userRole[_userAddress] = _role;
        
        return true;
    }  
    
    /*get user details*/
    function getUser(address _userAddress) public onlyAuthCaller returns( string memory name, 
                                                                     string memory contactNo, 
                                                                     string memory role,
                                                                    bool isActive
                                                                ){

        /*Getting value from struct*/
        Person memory tmpData = userDetails[_userAddress];
        
        return (tmpData.name, tmpData.contactNo, userRole[_userAddress], tmpData.isActive);
    }
    
     /*set Retailer data*/
    function setRetailerData(address batchNo,
                              string memory _registrationNo, string memory _shopName ,string memory _shopAddress) public onlyAuthCaller returns(bool){
        
         
        retailerData.registrationNo = _registrationNo;
        retailerData.shopName = _shopName;
        retailerData.shopAddress = _shopAddress;
        batchRetailer[batchNo] =  retailerData;
        
        nextAction[batchNo] = 'ASSEMBLER'; 
        
        return true;
    }
    
     /*get Retailer data*/
    function getRetailerData( address batchNo) public onlyAuthCaller returns(string memory registrationNo ,
                                                                     string memory shopName, string memory shopAddress){

        Retailer memory tmpData = batchRetailer[batchNo];
        return (tmpData.registrationNo,
                tmpData.shopName,
                tmpData.shopAddress);
    }
    
     /*set Assembeler data*/
    function setAssemblerData(address batchNo,
                              string memory _expertiseArea, string memory _experience) public onlyAuthCaller returns(bool){
        
        assemblerData.expertiseArea = _expertiseArea;
        assemblerData.experience = _experience;
        
        batchAssembler[batchNo] = assemblerData;
        
        nextAction[batchNo] = 'INSPECTION'; 
        
        return true;
    }
    
    /*get Assembeler data*/
    function getAssemblerData(address batchNo) public onlyAuthCaller returns(string memory expertiseArea,
                                                                            string memory experience){
        
        Assembler memory tmpData = batchAssembler[batchNo];
    
        return (tmpData.expertiseArea,tmpData.experience);
        
    }

    /*set product Inspector data*/
    function setProductInspectorData(address batchNo,
                                     string memory _typeOfProduct,
                                     string memory _serviceChecked) public onlyAuthCaller returns(bool){
        productInspectorData.typeOfProduct = _typeOfProduct;
        productInspectorData.serviceChecked = _serviceChecked;
        
        batchProductInspector[batchNo] = productInspectorData;
        
        nextAction[batchNo] = 'PACKAGING'; 
        
        return true;
    }
    
    
    /*get product Inspector data*/
    function getProductInspectorData(address batchNo) public onlyAuthCaller returns ( string memory typeOfProduct, string memory serviceChecked){
        
        ProductInspector memory tmpData = batchProductInspector[batchNo];
        return (tmpData.typeOfProduct, tmpData.serviceChecked);
    }
    

    /*set product packer data*/
    function setPackerData(address batchNo,
                               string memory _typeOfProduct,
                               string memory _materialUsed) public onlyAuthCaller returns(bool){
        packerData.typeOfProduct = _typeOfProduct;
        packerData.materialUsed = _materialUsed;
        
        batchPacker[batchNo] = packerData;
        
        nextAction[batchNo] = 'DELIVERY'; 
        
        return true;
    }
    
    /*get product packer data*/
    function getPackerData(address batchNo) public onlyAuthCaller returns( string memory _typeOfProduct,
                                                                                            string memory _materialUsed){
        
        Packer memory tmpData = batchPacker[batchNo];
        return (tmpData.typeOfProduct, tmpData.materialUsed);
    }
    
    /*set Deliverer data*/
    function setDeliverData(address batchNo,
                               string memory _typeOfProduct,
                               string memory _vehicalUsed
                               ) public onlyAuthCaller returns(bool){
        
        deliverData.typeOfProduct = _typeOfProduct;
        deliverData.vehicalUsed = _vehicalUsed;
        batchDeliver[batchNo] = deliverData;
        
        nextAction[batchNo] = 'PERSON'; 
        
        return true;
    }
    
    /*get Deliverer data*/
    function getDeliverData(address batchNo) public onlyAuthCaller returns(string memory _typeOfProduct,
                               string memory _vehicalUsed){
        
        Deliver memory tmpData = batchDeliver[batchNo];

        return (tmpData.typeOfProduct, 
                tmpData.vehicalUsed);
        
    }
  }
