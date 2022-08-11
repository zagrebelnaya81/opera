(function() {
  var disabledBtns = document.querySelectorAll("[type=submit], [data-btn-disabled]");

  for (var i = 0; i < disabledBtns.length; i++) {
    disabledBtns[i].addEventListener("click", function(e) {
      var self = this;

      setTimeout(function(){
        self.setAttribute("disabled", true);
      }, 50);
    });
  }
})();

