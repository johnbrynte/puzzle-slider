document.write("hello");

var t = 0;
var touchStart;
var touchX = null;
var debug = "";
var step = Math.PI*2/12;

var touchOffset;
var touchPrev;

var w = window.innerWidth;
var h = window.innerHeight;
var full = true;
for (var i=0; i<Math.PI*2;) {
  var a = i - Math.PI/2;
  lineAt(w/2+Math.cos(a)*90, h/2+Math.sin(a)*90, full);
  i += step;
  full = !full;
}

function lineAt(x,y,full) {
  var e = document.createElement("dev");
  e.className = "line";
  e.style.left = x+"px";
  e.style.top = y+"px";
  e.style.transform = full ? "scale(3)" : "";
  document.body.appendChild(e);
}

var ballEl = document.getElementById("ball");
var debugEl = document.getElementById("debug");
var handleEl = document.getElementsByClassName("ball_handle")[0];

var ball = {
  pos: {x:0,y:0},
  vel: {x:0,y:0},
}

var target = {x:0,y:0};

function setBallPos(a) {
  ballEl.style.transform = "translate("+window.innerWidth/2+"px,"+(window.innerHeight/2)+"px) rotate("+a+"rad)";
}

function getAngle(p) {
  var a = Math.atan((p.y-h/2)/(p.x-w/2));
  a += Math.PI;
  if (p.x > w/2)
    return Math.PI+a;
  return a;
}

function getRelativeAngle(b, p) {
  var a = getAngle(p);
  var i = 0;
  while (i > b) {
    i -= Math.PI*2;
  }
  while (i < b) {
    i += Math.PI*2;
  }
  a += i-Math.PI*2;
  if (a < b-Math.PI)
    a += Math.PI*2;
  else if (a > b+Math.PI)
    a += -Math.PI*2;
  return a;
}

timer(update, fixedUpdate);

input.onTouchStart(p => {
  var a = getRelativeAngle(ball.pos.x, p);
  touchPrev = a;
  
  touchOffset = a - ball.pos.x;
  a = touchOffset;
  var hx = Math.cos(a)*80;
  var hy = Math.sin(a)*80;
  // visualize handle point
  //handleEl.style.visibility = "visible";
  handleEl.style.transform = "translate("+hx+"px,"+hy+"px)";
})

input.onTouchMove(p => {
  var a = getRelativeAngle(touchPrev, p);
  
  a -= touchOffset;
  
  touchPrev = a;
  
  touchX = a;
  
  //debugEl.innerHTML = a;
})

input.onTouchEnd(p => {
  //target.x = window.innerWidth;
  touchX = null;
})

var obj = {
  numberOfSteps: 12,
  angle: 0,
}

function update(d) {
  setBallPos(ball.pos.x);
}

function fixedUpdate(d) {
  //ball.vel.x += - 10*ball.vel.x*d;
  ball.vel.x += (target.x - ball.pos.x)*350*d - 40*ball.vel.x*d;
  if (touchX != null)
    ball.vel.x += (touchX - ball.pos.x)*350*d;
  ball.pos.x += ball.vel.x*d;
  
  if (ball.pos.x > target.x+step)
    target.x += step*2;
  if (ball.pos.x < target.x-step)
    target.x -= step*2;
}