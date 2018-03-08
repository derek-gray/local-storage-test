function SessionManager(timeoutWarningDuration, sessionDuration, modalWindow, countdownContainer) {

  this.idleTime = 0;
  this.timeoutSeconds = timeoutWarningDuration;

  this.warningPeriodActive = false;

  var self = this;


  document.addEventListener("click", function(e) {
    fireSessionEvent({
      detail: {
        type: "user-active"
      }
    });
  }, false);

  var minutesCountdownInterval = setInterval(function(){self.idleTimerIncrement()}, 60000);

  addSessionEventListener(function(e){
    if (e.detail.type == 'user-active') {

      $.ajax({
        type: "POST",
        beforeSend: function(request) {
          request.setRequestHeader("Authority", authorizationToken);
        },
        url: "entities",
        data: "json=" + escape(JSON.stringify(createRequestObject)),
        processData: false,
        success: function(msg) {
          $("#results").append("The result =" + StringifyPretty(msg));
        }
      });

      self.idleTime = 0;

    }
  });



  this.startTimeoutWarningPeriod = function(){

    clearInterval(minutesCountdownInterval);
    self.timeoutSeconds = self.timeoutSeconds - 1;
    self.changeSecondsHtml(self.timeoutSeconds);

    if (self.timeoutSeconds <= 0) {
      self.startSignout();
    }
  };

  this.changeSecondsHtml = function(secondsRemaining){
    countdownContainer.html(secondsRemaining);
  };

  this.stopTimeoutWarningPeriod = function(){
    minutesCountdownInterval = setInterval(function(){self.idleTimerIncrement()}, 60000);
    clearInterval(modalWindow.data('interval'));
    self.timeoutSeconds = timeoutWarningDuration;
    this.idleTime = 0;
  };

  this.idleTimerIncrement = function() {
    this.idleTime = this.idleTime + 60;
    console.log("User inactive. Idle time: " + this.idleTime + " minutes");
    if (this.idleTime >= sessionDuration - timeoutWarningDuration) {
      fireSessionEvent({
        detail: {
          type: "initiate-timeout"
        }
      });
    }
  };

  this.startTimeoutWarning = function(){
    self.warningPeriodActive = true;
    self.changeSecondsHtml(timeoutWarningDuration);
    this.toggleModal(true);
    modalWindow.data('interval', setInterval(self.startTimeoutWarningPeriod, 1000));
  };

  this.extendSession = function() {
    self.warningPeriodActive = false;
    this.toggleModal(false);
    self.stopTimeoutWarningPeriod();
  };

  this.toggleModal = function(showModal) {
    if (showModal == true) {
      modalWindow.css('display', 'block');
      modalWindow.css('opacity', '1');
    } else {
      modalWindow.css('display', 'none');
      modalWindow.css('opacity', '0');
    }
  };

  this.startSignout = function() {
    window.location.replace("/signout.html");
  };

  addSessionEventListener(function(e){
    switch (e.detail.type) {
      case 'initiate-timeout' :
        if(self.warningPeriodActive == false) {
          self.startTimeoutWarning();
        }
        break;

      case 'signout' :
        self.startSignout();
        break;

      case 'extend-session' :
        self.extendSession();
        break;
    }
  });
}