// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CrowdFunding{

    mapping(address=>uint) public contributors;//who donate how much money
    address public manager;
    uint public minimumContribution;
    uint public deadline;
    uint public target;
    uint public raisedAmount;
    uint public noOfContributors;// this is for consensus(voting)

    struct Request{     /*this is making for when manager request 
                        from contributer to take out money 
                        from smart contract through consensus of contributer*/
           string description; // manager tell why need(cause)
           address payable recipient; // address of needy (asking for)
           uint value;//how much amount need
           bool completed;//is request is pending or not after taking voting
           uint noOfVoters;// how many contributor voted 
           mapping(address=>bool) voters;  //here voters will verify
    }

    mapping(uint=>Request) public request;//ye mapping Request will consist...no. of request can come for different different cause
    uint public numRequest;// whyput this ..becoz in mapping increment type is not possible but possible in array

     constructor(uint _target, uint _deadline){ // constructor function always first in the program
         deadline = block.timestamp+_deadline;
         minimumContribution = 100 wei;
         manager = msg.sender;    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
     }

     function sendEth() public payable{     //ether transfer by contributors
       require(block.timestamp < deadline, "deadline has passes");/*but before transfer by contributor,
                                                                first check that dadline date is still active or not....
                                                                if not than contributor not allowed to send amount*/
       require(msg.value >=minimumContribution," minimumContribution is not met");
    
        // if both above condition are satisfied thnn...

        if(contributors[msg.sender]==0){   // in solidity bydefault uint ==0
             noOfContributors++; /* when contributor  contribute some 
                                    amount the increase contributors
                                    by 1*/ 

        }
        contributors[msg.sender]+= msg.value; /*if msg.value == 100wei == 
                                                transfer to msg.sender (+ sign show contibutors can donate unlimited times 
                                                and now msg.sender have huge wei*/
        raisedAmount+= msg.value;//then raised amount will increse then
     } 

        function getContractBalane() public view returns(uint){
            return address(this).balance; 
        }
        function refund() public{

       require(block.timestamp > deadline && raisedAmount<target,"you are no eligible for refund");
        require(contributors[msg.sender]>0);//check contributor gave some amount or not
        // if above condition satisfy then 
        address payable user = payable(msg.sender);//here payable msg.sender  explicitly creat for refund the maount
        user.transfer(contributors[msg.sender]);//transfer the contibutors amount to user
        contributors[msg.sender]= 0;// this is for to remove the duplicacy
        }


        /* to remove duplicacy we use modifier
        (its is special type of function like constructor but 
        difference is modifier can be many where as constructor
         only one in one smart contructor)*/
        modifier onlyManager(){  
             require(msg.sender==manager, "only manager can call this function");
            _;
        
        }

        // this creat request function  can access only manager,,thats why we made modifier
        function creatRequests(string memory _description,address payable _recipient, uint _value) public onlyManager{
            Request storage newRequest = request[numRequest];/* when there is mapping in structure or
                                                               you will use that sturcture in function ,
                                                               so need to type storage instead of memory
                                                                */

          numRequest++;
          newRequest.description=_description;
           newRequest.recipient=_recipient;
            newRequest.value=_value;
             newRequest.completed=false;
              newRequest.noOfVoters=0;                                                     
        } 
        //now vote require by contributor
        function  voteRequest(uint _requestNo)public{
            require(contributors[msg.sender]>0,"You must be a contributor");//if you have money then you can be contributor
            Request storage thisRequest = request[_requestNo];
            // now check did they already voted or not
            require(thisRequest.voters[msg.sender]==false,"you have already voted");
            thisRequest.voters[msg.sender]= true;
            thisRequest.noOfVoters++;
        }
        function makePayment(uint _requestNo) public onlyManager{
            require(raisedAmount>=target);
            Request storage thisRequest = request[_requestNo];
            require(thisRequest.completed==false,"The request has been completed");
            require(thisRequest.noOfVoters> noOfContributors/2,"Majority does not support");
            thisRequest.recipient.transfer(thisRequest.value);
            thisRequest.completed=true;
        }   

}
