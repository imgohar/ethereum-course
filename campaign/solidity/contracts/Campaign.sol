// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Campaign {

    struct Reqeust{
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribution;
    address[] public approvers;

    Reqeust[] public requests;
    
    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    modifier admin() {
        require(msg.sender == manager, "Require Admin Privileges");
        _;
    }
    
    modifier minEntry() {
        require(msg.value > minimumContribution, "Require min amount of ETH(0.0011) to enter");
        _;
    }
    
    function contribute() public payable minEntry {
        approvers.push(msg.sender);
    }

    function createRequest(string memory description,uint value,address recipient) public payable admin{
        Reqeust memory newRequest = Reqeust({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });
        requests.push(newRequest);
    }
    
    
    
}