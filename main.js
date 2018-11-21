document.write("hello");

var t = 0;

timer(update, fixedUpdate);

var obj = {
  numberOfSteps: 12,
  angle: 0,
}

function update(d) {
  t += d*10;
  var s = "rgb(0,0,"+Math.floor(t)+")";
  document.body.style.background = s;
  document.body.style.color ="white";
  document.body.innerHTML = "";
  document.write(s);
}

function fixedUpdate(d) {
  
}