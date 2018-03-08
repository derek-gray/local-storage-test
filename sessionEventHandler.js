// $(function(){
//   $('.signout-button').click(function(){
//     fireSessionEvent({
//       detail: {
//         type: "signout"
//       }
//     });
//   });
//
//   $('.extend-session-button').click(function(){
//     fireSessionEvent({
//       detail: {
//         type: "extend-session"
//       }
//     });
//   });
//
//   $('.show-modal').click(function(){
//     fireSessionEvent({
//       detail: {
//         type: "initiate-timeout"
//       }
//     });
//   });
//
//   addSessionEventListener(function(e){
//     switch (e.detail.type) {
//       case 'initiate-timeout' :
//         initialiseTimeout();
//         break;
//
//       case 'signout' :
//         signout();
//         break;
//
//       case 'extend-session' :
//         extendSession();
//         break;
//
//       case 'user-active' :
//         idleTime = 0;
//         console.log("idle time reset");
//         break;
//       }
//     console.log(e.detail.type);
//   });
//
//   function initialiseTimeout() {
//     toggleModal(true);
//     $('.modalDialog').data('interval', setInterval(startTimeoutWarningPeriod, 1000));
//   }
//
//   function extendSession() {
//     toggleModal(false);
//     stopTimeoutWarningPeriod();
//   }
//
//   function toggleModal(modalBool) {
//     var modalWindow = document.getElementById('modal-window');
//     if (modalBool == true) {
//       modalWindow.style.display = 'block';
//       modalWindow.style.opacity = '1';
//     } else {
//       modalWindow.style.display = 'none';
//       modalWindow.style.opacity = '0';
//     }
//   }
// });