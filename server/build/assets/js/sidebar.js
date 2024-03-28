/* eslint-disable no-undef */
const mainMenuItem = $("aside.sidebar > ul > li");

mainMenuItem.mouseenter(function () {
  // Loop through the contents and get the height;
  var tH = 0;
  var i = 0;

  jQuery(this)
    .find("ul.sb_dropdown > li")
    .each(function () {
      tH = tH + jQuery(this).outerHeight();
      // console.log(jQuery(this).outerHeight());
    });
  jQuery(this).addClass("opened");
  jQuery(this)
    .find("ul.sb_dropdown")
    .css("height", tH + 20);
  jQuery(this).find("ul.sb_dropdown").css("padding-top", 10);
});

jQuery("aside.sidebar > ul > li").mouseleave(function () {
  mainMenuItem.removeClass("opened");
  mainMenuItem.find("ul.sb_dropdown").css("padding-top", "");
  mainMenuItem.find("ul.sb_dropdown").css("height", "");
});
