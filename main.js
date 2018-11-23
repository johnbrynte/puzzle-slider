document.write("hello");

var t = 0;
var debug = "";

var ballEl = document.getElementById("ball");

function setBallPos(x,y) {
  ballEl.style.transform = "translate("+x+"px,"+(window.innerHeight/2)+"px)";
}

timer(update, fixedUpdate);

input.onTouchMove(p => {
  debug = p.x;
  t = p.x/5;
  setBallPos(p.x,p.y);
})

var obj = {
  numberOfSteps: 12,
  angle: 0,
}

function update(d) {
  // t += d*10;
  var s = "rgb(0,0,"+Math.floor(t)+")";
  document.body.style.background = s;
  document.body.style.color ="white";
  //document.body.innerHTML = "";
  //document.write(debug);
  //document.write(s);
}

function fixedUpdate(d) {
  
}