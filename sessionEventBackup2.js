
function fireSessionEvent(sessionEvent) {

    localStorage.setItem('sessionEventEnvelope', JSON.stringify({
        payload: sessionEvent,
        timestamp: new Date().getTime()
    }));

    window.dispatchEvent(new CustomEvent('sessionEvent', sessionEvent));
}

function addSessionEventListener(f) {
    window.addEventListener('sessionEvent', f);
}

function _handleStorageEvent(e) {
    if (e.key == "sessionEventEnvelope") {
        var sessionEvent = JSON.parse(e.newValue).payload;
        window.dispatchEvent(new CustomEvent('sessionEvent', sessionEvent));
    }
}

$(function(){
    window.addEventListener('storage', _handleStorageEvent);  //FIXME - can this be removed

});