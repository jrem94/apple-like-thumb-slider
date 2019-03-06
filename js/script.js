$(document).ready(() => {
  let totalWidth = 0;
  let positions = new Array();

  $("#slides .slide").each(function(i) {
    positions[i] = totalWidth;
    totalWidth += $(this).width();

    if (!$(this).width()) {
      alert("Please add a width to your images");
      return false;
    }
  });

  $("#slides").width(totalWidth);

  $("#menu ul li a").click(function(e, keepScroll) {
    $("li.product")
      .removeClass("active")
      .addClass("inactive");

    $(this)
      .parent()
      .addClass("active");

    let pos = $(this)
      .parent()
      .prevAll(".product").length;

    $("#slides")
      .stop()
      .animate({ marginLeft: -positions[pos] + "px" }, 450);

    e.preventDefault();

    if (!autoScroll) {
      clearInterval(itvl);
    }
  });

  $("#menu ul li.product:first")
    .addClass("active")
    .siblings()
    .addClass("inactive");

  let current = 1;

  function autoScroll() {
    if (current === -1) {
      return false;
    }

    $("#menu ul li a")
      .eq(current % $("#menu ul li a").length)
      .trigger("click", [true]);

    current++;
  }

  let duration = 5000;
  itvl = setInterval(function() {
    autoScroll();
  }, duration);
});
