const con = document.getElementById("console");
let body_bg = ["white", "black"];
let toggle_button_background = ["orangered", "yellow"];
let rotation = 0;
let themeid = 0;
function swaptheme() {
  themeid = (themeid + 1) % 2;
  document.documentElement.style.setProperty("--body-bg", body_bg[themeid]);
  document.documentElement.style.setProperty(
    "--toggle-button-bg",
    toggle_button_background[themeid]
  );
  rotation += 180;
  document.documentElement.style.setProperty("--rotation", `${rotation}deg`);
  if (themeid == 1) {
    document.documentElement.style.setProperty("--opacity-moon", `1`);
    document.documentElement.style.setProperty("--opacity-sun", `0`);
  } else {
    document.documentElement.style.setProperty("--opacity-moon", `0`);
    document.documentElement.style.setProperty("--opacity-sun", `1`);
  }
}
