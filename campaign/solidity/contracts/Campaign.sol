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
    address public winner;


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
    
    
    
}