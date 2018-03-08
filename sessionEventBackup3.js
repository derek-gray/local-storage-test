//
// function fireSessionEvent(sessionEvent) {
//
//     localStorage.setItem('sessionEventEnvelope', JSON.stringify({
//         payload: sessionEvent,
//         timestamp: new Date().getTime()
//     }));
//
//     window.dispatchEvent(new CustomEvent('sessionEvent', sessionEvent));
// }
//
// function addSessionEventListener(f) {
//     window.addEventListener('sessionEvent', f);
// }
//
// function _handleStorageEvent(e) {
//     if (e.key == "sessionEventEnvelope") {
//         var sessionEvent = JSON.parse(e.newValue).payload;
//         window.dispatchEvent(new CustomEvent('sessionEvent', sessionEvent));
//     }
// }
//
// document.addEventListener("click", function (e) {
//     userWasActive = true;
//     console.log('click event | userWasActive: ' + userWasActive);
// }, false);
//
// var idleTime = 0;
// var userWasActive = false;
// //var modalWindow = document.getElementById('modal-window');
// var secondsRemaining = 60;
//
// function idleTimerIncrement(userActivity) {
//     console.log('function idleTimerIncrement called');
//     if (userActivity === false) {
//         idleTime = idleTime + 1;
//         console.log("User inactive. Idle time: " + idleTime + " minutes");
//         if (idleTime >= 14) {
//             console.log("User idle for 14 minutes. Showing modal");
//             fireSessionEvent({
//                 detail: {
//                     type: "show-modal"
//                 }
//             });
//             var modalCountdown = setInterval(function(){countdown()}, 1000);
//             clearInterval(checkIfUserIdle);
//         }
//     }else if (userActivity === true) {
//         console.log("user was active");
//         fireSessionEvent({
//             detail: {
//                 type: "user-active"
//             }
//         });
//         userWasActive = false;
//     }
// }
//
// var checkIfUserIdle = setInterval(function(){idleTimerIncrement(userWasActive)}, 60000);
//
// function signOut() {
//     window.location.replace("/signout.html");
// }
//
// function countdown() {
//     var countdownContent = document.getElementById('countdown');
//     secondsRemaining = secondsRemaining - 1;
//     console.log(secondsRemaining);
//     if (secondsRemaining >= 0) {
//         countdownContent.innerHTML = secondsRemaining;
//     } else {
//         countdownContent.innerHTML = 0;
//         signOut();
//     }
// }
// $(function(){
//     window.addEventListener('storage', _handleStorageEvent);
// });
//
// var modalCountdown;
//
// $(function(){
//     $('.signout-button').click(function(){
//         fireSessionEvent({
//             detail: {
//                 type: "signout"
//             }
//         });
//     });
//
//     $('.extend-session-button').click(function(){
//         fireSessionEvent({
//             detail: {
//                 type: "extend-session"
//             }
//         });
//     });
//
//     $('.show-modal').click(function(){
//         fireSessionEvent({
//             detail: {
//                 type: "show-modal"
//             }
//         });
//     });
//
//     addSessionEventListener(function(e){
//         switch (e.detail.type) {
//             case 'show-modal' :
//                 initialiseTimeout();
//                 break;
//
//             case 'signout' :
//                 signout();
//                 break;
//
//             case 'extend-session' :
//                 extendSession();
//                 break;
//             case 'user-active' :
//                 idleTime = 0;
//                 console.log("idle time reset");
//                 break;
//         }
//         console.log(e.detail.type);
//     });
// });
//
// function initialiseTimeout() {
//     var modalWindow = document.getElementById('modal-window');
//
//     modalWindow.style.display = 'block';
//     modalWindow.style.opacity = '1';
//     modalCountdown = setInterval(countdown, 1000);
// }
//
// function extendSession() {
//     var modalWindow = document.getElementById('modal-window');
//
//     modalWindow.style.display = 'none';
//     modalWindow.style.opacity = '0';
//     clearInterval(modalCountdown);
//     secondsRemaining = 60;
//     document.getElementById('countdown').innerHTML = secondsRemaining;
// }
// //
// // function countdown() {
// //     var countdownContent = document.getElementById('countdown');
// //     secondsRemaining = secondsRemaining - 1;
// //     console.log(secondsRemaining);
// //     if (secondsRemaining >= 0) {
// //         countdownContent.innerHTML = secondsRemaining;
// //     } else {
// //         countdownContent.innerHTML = 0;
// //         signOut();
// //     }
// // }