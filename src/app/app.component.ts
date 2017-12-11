import { Component , OnInit } from '@angular/core';
declare var Skylink;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  name = '';
  message = '';
  joined = 0;
  joinedSite = '';
  peerList = [];
  ChatMessage = [];
  skylinkDemo = new Skylink();

  ngOnInit() {
    // var skylinkDemo = new Skylink();
    this.skylinkDemo.init( "dd3a2d97-27df-4862-966b-b0b296236452", function (error, success) {
     if (success) {
       console.log("hello");
     }
    });

    this.skylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
    var user = 'You';
    console.log("joined")
    console.log(peerId)
    console.log(peerInfo)
    console.log(isSelf)

    if(!isSelf) {
      console.log("joinedk")
    user = peerInfo.userData.name || peerId;
    }
    this.peerList.push(user);
    // alert("hello")
    this.addMessage(user + ' joined the room', 'action');
  }.bind(this));

  this.skylinkDemo.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
    var user = 'You',
    className = 'you';
    if(!isSelf) {
    user = peerInfo.userData.name || peerId;
    className = 'message';
    }
    this.addMessage(user + ': ' + message.content, className);
    }.bind(this));


  }


  setName() {
    console.log(this.name);
    this.skylinkDemo.setUserData({
    name: this.name
    });
  }
  sendMessage() {
    this.skylinkDemo.sendP2PMessage(this.message);
    this.message = '';
  }

 joinRoomHost() {
   this.skylinkDemo.setUserData({
   name: this.name,
   site: 'host'
   });
   this.skylinkDemo.joinRoom();
   this.joined = 1;
   this.joinedSite = 'host';
 }
 joinRoomPeer () {
   this.skylinkDemo.setUserData({
   name: this.name,
   site: 'peer'
   });
   this.skylinkDemo.joinRoom();
   this.joined = 1;
    this.joinedSite = 'peer';
 }

  addMessage(message , className) {
    console.log(this.peerList);
    // this.peerList.push[]
    console.log("hello");
    console.log(message);
    console.log(className);
    this.ChatMessage.push(message);
  }
   leaveRoom() {
  this.skylinkDemo.leaveRoom();
  }
}
