import { Component , OnInit , ViewChild } from '@angular/core';
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
  id = '';
  ChatMessage = [];
  skylinkDemo = new Skylink();

  ngOnInit() {
    // var skylinkDemo = new Skylink();
    this.skylinkDemo.init( "dd3a2d97-27df-4862-966b-b0b296236452", function (error, success) {
     if (success) {
       console.log("hello");
     };

    }.bind(this));

    this.skylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
    var user = 'You';
    console.log("joined")
    console.log(peerId)
    console.log(peerInfo)
    console.log(isSelf)
// We already have a video element for our video and don't need to create a new one.
    let vid = document.createElement('video');
    vid.autoplay = true;
    vid.muted = true; // Added to avoid feedback when testing locally
    vid.id = peerId;
    this.id = peerId;
    document.body.appendChild(vid);

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

    this.skylinkDemo.on('incomingStream', function(peerId, stream, isSelf) {
      console.log(stream);
      if(isSelf) return;
      var vid = document.getElementById(peerId);
      attachMediaStream(vid, stream);
    }.bind(this));

    this.skylinkDemo.on('mediaAccessSuccess', function(stream) {
      var vid = document.getElementById('myvideo');
      attachMediaStream(vid, stream);
    });

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
  //  this.skylinkDemo.joinRoom();
  this.skylinkDemo.joinRoom({
   audio: true,
   video: true
 });
   this.joined = 1;
   this.joinedSite = 'host';
 }
 joinRoomPeer () {
   this.skylinkDemo.setUserData({
   name: this.name,
   site: 'peer'
   });

   this.skylinkDemo.joinRoom({
    audio: true,
    video: true
  });
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
