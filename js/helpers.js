let helpers = function () {
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (() =>
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function(callback) { window.setTimeout(callback, 1000 / 60) }
  )()
}


let getImage = function (t) {
  let e = t + ".jpg"
  let imageObj = new Image()
  imageObj.src = e
  // imageObj.onload = function() {
  //   context.drawImage(imageObj, 0, 0)
  // }
  return imageObj
}

export { helpers, getImage }