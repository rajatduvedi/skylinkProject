import { Component , OnInit , ViewChild } from '@angular/core';
declare var Skylink;
declare var attachMediaStream;

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
  ids = [];
  ChatMessage = [];
  skylinkDemo = new Skylink();

  ngOnInit() {
    // var skylinkDemo = new Skylink();
    this.skylinkDemo.init( "5ba8467c-f982-43e1-9fab-1093f8c73f45", function (error, success) {
     if (success) {
       console.log("conneted");
     };

    }.bind(this));

    this.skylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
    var user = 'You';
    console.log("joined")
    console.log(peerId)
    console.log(peerInfo)
    console.log(isSelf);
    if(isSelf) return;
    this.ids.push( peerId);

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

  handsUp() {
    console.log("hello")
  }
}
