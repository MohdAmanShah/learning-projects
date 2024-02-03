const Button = document.getElementById("untouchable-button");
Button.addEventListener("click", (e) => {
  e.preventDefault();
  window.close();
});
const OFFSET_HORIZONTAL = 50;
const OFFSET_VERTICAL = 50;
const PUSH_VALUE = 200;
window.addEventListener("mousemove", (e) => {
  let button = Button.getBoundingClientRect();
  let mouse = {
    X: e.pageX,
    Y: e.pageY,
  };
  if (isInOuter(button, mouse) && !isInInner(button, mouse)) {
    mirroredPosition = getMirroredPosition(button, mouse);

    let nextLeftPosition = mirroredPosition.X - button.width / 2;
    let nextTopPosition = mirroredPosition.Y - button.height / 2;

    if (nextLeftPosition < 0) {
      Button.style.left = `${window.innerWidth - button.width - 50}px`;
    } else if (nextLeftPosition + button.width > window.innerWidth) {
      Button.style.left = "50px";
    } else {
      Button.style.left = `${nextLeftPosition}px`;
    }

    if (nextTopPosition < 0) {
      Button.style.top = `${window.innerHeight - button.height - 50}px`;
    } else if (nextTopPosition + button.height > window.innerHeight) {
      Button.style.top = "50px";
    } else {
      Button.style.top = `${nextTopPosition}px`;
    }
  }
});

function isInOuter(buttonOuter, mouse) {
  if (
    mouse.X > buttonOuter.left - OFFSET_HORIZONTAL &&
    mouse.Y > buttonOuter.top - OFFSET_VERTICAL &&
    mouse.X < buttonOuter.right + OFFSET_HORIZONTAL &&
    mouse.Y < buttonOuter.bottom + OFFSET_VERTICAL
  )
    return true;
  return false;
}
function isInInner(button, mouse) {
  if (
    mouse.X > button.left &&
    mouse.Y > button.top &&
    mouse.X < button.right &&
    mouse.Y < button.bottom
  )
    return true;
  return false;
}
// if needed to increase or decrease displacement based on distance between mouse and button
// function getDistance(mouse, button) {
//   buttonCenterX = button.x + button.width / 2;
//   buttonCenterY = button.y + button.height / 2;
//   //   return Math.sqrt(
//   //     Math.pow(buttonCenterX - mouse.X, 2) + Math.pow(buttonCenterY - mouse.Y, 2)
//   //   );
//   return {
//     X: buttonCenterX - mouse.X,
//     Y: buttonCenterY - mouse.Y,
//   };
// }

// formula to mirror a moving point with respect to a fixed point
// mirrorX = 2 * fixedX - movingX
// mirrorY = 2 * fixedY - movingY

function getMirroredPosition(button, mouse) {
  buttonCenterX = button.x + button.width / 2;
  buttonCenterY = button.y + button.height / 2;

  mirroredX = 2 * buttonCenterX - mouse.X;
  mirroredY = 2 * buttonCenterY - mouse.Y;
  return {
    X: mirroredX,
    Y: mirroredY,
  };
}
