// EVENT DELEGATION FUNCTION AVAILABLE EVERYWHERE

function addDelegatedEvent(selector, event, handler) {
  const domElement = document.querySelector("body");
  domElement.addEventListener(
    event,
    function (e) {
      let targetElement = e.target;
      while (targetElement != null) {
        if (targetElement.matches(selector)) {
          handler(e);
          return;
        }
        targetElement = targetElement.parentElement;
      }
    },
    true
  );
}
