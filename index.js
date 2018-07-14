let context = new AudioContext();

document.body.style =
  'padding:0;margin:0;background-color:#000;color:#000;overflow:hidden;';

document.title = 'Equestrilateral Aesthetics.';
d.style =
  'content:"";position:absolute;top:0;left:-50vw;width:200vw;height:100vh;transform:perspective(300px) rotateX(80deg);background:linear-gradient(#FFFFFF0F 1px,#FF0092 2px, #FFFFFF0F 3px, transparent 4px),linear-gradient(90deg, #FFFFFF0F 1px, #FF0092 2px, #FFFFFF0F 3px, transparent 4px), #000;background-position:-100px 0, -100px 0;background-size:2% 2%, 2% 2%;';

let dd = document.createElement('div');
dd.style =
  'content:"";opacity:0;position:absolute;top:0;left:0;width:100vw;height:100vh;background:#fff;';
document.body.appendChild(dd);

ddd.style =
  'content:"";position:absolute;top:45vh;left:0;width:100vw;height:20vh;background:linear-gradient(#000 0%, transparent 100%);';

l.style = 'position:absolute;top:0;left:0;';
l.setAttribute('height', window.innerHeight);
l.setAttribute('width', window.innerWidth);

c.style =
  'position:absolute;top:0;left:0;transform:translateY(-100vh);transition:transform 1s ease-in-out;';
c.setAttribute('height', window.innerHeight);
c.setAttribute('width', window.innerWidth);

let cx = c.getContext('2d');
let lx = l.getContext('2d');
let W = cx.canvas.width;
let H = cx.canvas.height;

let lightning = [];
let lightTimeCurrent = 0;
let lightTimeTotal = 100;

let S = Math.sin;
let C = Math.cos;

let btn = document.createElement('button');
btn.style =
  'position:absolute;top:25vh;left:40vw;height:10vh;width:20vw;border:1px solid black;background:#FF0092;font-size:7.5vh;color:#333;';
btn.innerText = 'Play';
document.body.appendChild(btn);

let scroller = document.createElement('div');
scroller.style =
  'position:absolute;bottom:5vh;left:200vw;color:#FF0092;font-size:7.5vh;padding:0;margin:0;transform:translateX(0);width:1000vw;transition:transform 40s linear;font-family:verdana;text-shadow:#FFF 5px 5px 10px;display:flex;justify-content:space-between;font-weight:700;text-transform:uppercase;';
[
  '"Equestrilateral Aesthetics."',
  'Tribute to a decade never lived.',
  'Sorry.',
  'Not sorry.',
  'Muzak: sebbert',
  'Spaghetti: mollerse',
  'Unfucking: Lorents',
  'Fin.'
].forEach(t => {
  let d = document.createElement('div');
  d.innerHTML = t;
  scroller.appendChild(d);
});
document.body.appendChild(scroller);

function random2(L, U) {
  return L + (U - L) * Math.random();
}
function random2i(L, U) {
  return 0 | random2(L, U);
}

function glitchit() {
  let verticalSlices = 0 | (H / 20);
  let img = cx.getImageData(0, 0, W, H);

  for (let i = 0; i < verticalSlices; i++) {
    Math.random() > 0.5 &&
      cx.putImageData(img, random2i(-10, 10), 0, 0, i * 20, W, 20);
  }
}
function scanLine(i) {
  if (Math.random() > 0.5) return;
  cx.translate(0, (i * 20) % W);
  cx.globalAlpha = 0.1;
  cx.strokeStyle = 'grey';
  cx.shadowBlur = 20;
  cx.shadowColor = 'grey';
  cx.globalCompositeOperation = 'lighter';
  [1, 2, 3, 4].forEach(function(i) {
    cx.lineWidth = i * 7.5;
    cx.beginPath();
    cx.moveTo(0, 0);
    cx.lineTo(W, 0);
    cx.stroke();
  });
}
function drawTriangle(color) {
  cx.shadowBlur = random2i(5, 10);
  cx.shadowColor = color;
  cx.globalCompositeOperation = 'lighter';

  [0.25, 0.5, 0.75, 1].forEach(function(i) {
    cx.lineWidth = i * 4;

    cx.beginPath();
    cx.moveTo(0, -200);
    cx.lineTo(200, 200);
    cx.lineTo(-200, 200);
    cx.closePath();
    cx.stroke();
  });
}
function lighteningstrike() {
  let createCount = random2i(1, 3);
  for (let i = 0; i < createCount; i++) {
    let x =
      Math.random() > 0.5
        ? random2(W / 10, W / 3)
        : random2((2 * W) / 3, (9 * W) / 10);
    let y = random2(50, (2 * H) / 10);
    lightning.push({
      x,
      y,
      xRange: random2(15, 30),
      yRange: random2(25, 30),
      path: [{ x, y }],
      pathLimit: random2(25, 30)
    });
  }
}

function animateTriangles(i) {
  cx.clearRect(0, 0, W, H);

  cx.save();
  cx.translate(W / 2, H / 2);
  cx.translate(0, -100);

  let times = 10 + (0 | (10 * S(i / 20)));
  for (let n = 0; n < times; n++) {
    let f = 0.01;
    cx.scale(1 - n * f, 1 - n * f);
    let color = `hsl(${(360 / times) * n + (i % 360)}, ${100}%, ${50}%)`;
    cx.strokeStyle = color;
    let r = 10;
    let theta = -(i * Math.PI) / 64;
    let dx = r * C(theta);
    let dy = r * S(theta);
    cx.translate(dx, 10 + dy);
    drawTriangle(color);
  }

  cx.restore();

  cx.save();
  scanLine(i);
  cx.restore();

  if (i % 20 == 0) {
    glitchit();
  }
}
function animateBackground() {
  lx.clearRect(0, 0, W, H);
  lightTimeCurrent++;
  if (lightTimeCurrent >= lightTimeTotal) {
    lighteningstrike();
    lightTimeCurrent = 0;
  }
  drawLightning();
}
function drawLightning() {
  for (let i = 0; i < lightning.length; i++) {
    let light = lightning[i];

    light.path.push({
      x:
        light.path[light.path.length - 1].x +
        (random2(0, light.xRange) - light.xRange / 2),
      y: light.path[light.path.length - 1].y + random2(0, light.yRange)
    });

    if (light.path.length > light.pathLimit) {
      lightning.splice(i, 1);
    }
    [1, 2, 3, 4].forEach(function(n) {
      lx.lineWidth = n * 0.5;
      lx.beginPath();
      lx.moveTo(light.x, light.y);
      for (let pc = 0; pc < light.path.length; pc++) {
        lx.lineTo(light.path[pc].x, light.path[pc].y);
      }
      lx.stroke();
    });
  }
}
function loop() {
  let t0 = 0;
  let i = 0;
  let f = 1;

  lx.strokeStyle = 'white';
  lx.shadowColor = 'blue';
  lx.shadowBlur = 15;
  lx.lineJoin = 'miter';

  function inner(t) {
    requestAnimationFrame(inner);
    if (t0 && t - t0 < 16) {
      return;
    }
    animateTriangles(i);
    animateBackground(i);
    if (f < -2) {
      f = 1;
    }
    dd.style.opacity = `${f}`;

    t0 = t;
    i++;
    f -= 0.1;
  }
  requestAnimationFrame(inner);
}
btn.addEventListener('click', function() {
  document.body.removeChild(btn);
  context.resume().then(() => {
    play(context);
    loop();
    scroller.style.transform = 'translateX(-1142vw)';
    d.style['transition'] = 'background-position 100s linear';
    d.style['background-position'] = '-100px 1000px, -100px 1000px';
    c.style['transition-delay'] = '6s';
    c.style['transform'] = 'translateY(0)';
  


  });
});

function play(ac) {
  /// <reference path="wat.d.ts" />

  var out = ac.createGain();
  out.connect(ac.destination);

  var sc = ac.createGain();
  sc.connect(out);

  sc.gain.setValueAtTime(0.35, 0);
  for (var i = 0; i < 500; ++i) {
    sc.gain.setValueAtTime(0, i / 2 + 16);
    sc.gain.setTargetAtTime(0.35, i / 2 + 16, 0.2);
  }

  var sr = ac.sampleRate;
  var decayTime = 10;

  var sampleFrames = 0 | decayTime;
  var len = 4 * ac.sampleRate;
  var buffer = ac.createBuffer(2, len, ac.sampleRate);
  var decay = 2;
  var [l, r] = [buffer.getChannelData(0), buffer.getChannelData(1)];
  for (var i = 0; i < len; ++i) {
    l[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay) * 0.5;
    r[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay) * 0.5;
  }

  var noise = ac.createScriptProcessor(undefined, 0, 2);
  noise.onaudioprocess = e => {
    var b = e.outputBuffer;
    for (var i = 0; i < b.numberOfChannels; ++i) {
      b.getChannelData(i).map((_, j, b) => (b[j] = Math.random() - 0.5));
    }
  };

  var verb = ac.createConvolver();
  verb.buffer = buffer;
  verb.connect(sc);

  var osc = ac.createOscillator();
  var osc7 = ac.createOscillator();
  osc.type = 'square';
  osc7.type = 'sawtooth';
  osc.frequency.value = 438;
  osc7.frequency.value = 444;
  osc.detune.value = 0;
  osc.start();
  osc7.start();
  var gain = ac.createGain();
  gain.gain.value = 0.5;
  var filter = ac.createBiquadFilter();
  osc.connect(osc7.connect(noise.connect(filter))).connect(gain);
  gain.connect(verb);
  gain.connect(sc);

  var mel = [0, 2, 3, 5, 7, 10];

  var foo = [15, 12, 14, 19];

  for (var i = 0; i < 1024; ++i) {
    if (i % 8) mel[5] = foo[((i / 8) | 0) % 4];

    osc.detune.setTargetAtTime(100 * mel[(i % 16) % mel.length], i / 8, 0.001);
    osc7.detune.setTargetAtTime(
      100 * mel[(i % 16) % mel.length] - 1200,
      i / 8,
      0.001
    );
    filter.frequency.setValueAtTime(18000 - Math.max(0, 12000 - i), i / 8);
    filter.frequency.setTargetAtTime(8000, i / 8, 0.05);
    gain.gain.setValueAtTime(0.5, i / 8);
    gain.gain.setTargetAtTime(0, i / 8, 0.0001 + Math.min(0.2, i / 1024));
  }

  var bassmel = [0, -4, -2, -7];
  var bassflt = ac.createBiquadFilter();
  var bassgain = ac.createGain();
  bassgain.gain.value = 0;

  var bo = ac.createOscillator();
  bo.type = 'square';
  bo.start();
  bo.connect(bassflt)
    .connect(bassgain)
    .connect(sc);
  bo.frequency.value = 440;

  for (var i = 0; i < 500; ++i) {
    // bo.detune.setValueAtTime()
    bo.detune.setTargetAtTime(100 * (bassmel[i % 4] - 3 * 12), i * 2, 0.01);

    bassgain.gain.setValueAtTime(0.7, i / 4);
    bassgain.gain.setTargetAtTime(0, i / 4, 0.12);

    bassflt.frequency.setValueAtTime(600 + Math.pow(i, 1.6), i / 4);
    bassflt.frequency.setTargetAtTime(200 + Math.pow(i, 1.6), i / 4, 0.05);
  }

  var sampler = ac.createBufferSource();
  sampler.loop = true;
  var comp = ac.createDynamicsCompressor();
  sampler.connect(comp).connect(out);
  var sr = 44100;
  var oac = new OfflineAudioContext(1, sr / 2, sr);

  // var hihat = oac.createGain();
  // noise(oac).connect(hihat);

  // for(var i = 0;i<20; ++i){
  //     hihat.gain.setValueAtTime(0,i/6);
  //     hihat.gain.linearRampToValueAtTime(.005, i/6+.01);
  //     //hihat.gain.exponentialRampToValueAtTime(.05,i);
  //     hihat.gain.exponentialRampToValueAtTime(0.00001,i/6+.07+(i==6)*.09);

  // }

  // var hihatflt = oac.createBiquadFilter();
  // hihatflt.type="highpass";
  // hihatflt.frequency.value = 1500;
  // hihat.connect(hihatflt);

  // noisepat.map((n,i) => {
  //     var f = oac.createBiquadFilter();
  //     f.type="peaking";
  //     f.frequency.value = nf(12*5+n);
  //     f.Q.setValueAtTime(0,0);
  //     f.Q.linearRampToValueAtTime(2, i);
  //     hihatflt.connect(f);
  //     f.connect(oac.destination);
  // })

  var gain = oac.createGain();
  var osc = oac.createOscillator();
  osc.type = 'triangle';
  var kflt = oac.createBiquadFilter();
  kflt.frequency.value = 1200;

  osc.connect(kflt).connect(gain);
  osc.start();

  // KICK
  osc.frequency.setValueAtTime(10, 0);
  osc.frequency.exponentialRampToValueAtTime(620, 0.00015);
  osc.frequency.exponentialRampToValueAtTime(80, 0.05);
  osc.frequency.exponentialRampToValueAtTime(30, 0.12);
  gain.gain.setValueAtTime(0, 0);
  gain.gain.exponentialRampToValueAtTime(1, 0.002);
  gain.gain.linearRampToValueAtTime(0.0001, 0.12);

  // // SNARE
  // osc.frequency.setValueAtTime(50, 1);
  // osc.frequency.exponentialRampToValueAtTime(450, 1.0025);
  // osc.frequency.exponentialRampToValueAtTime(250, 1.05);
  // osc.frequency.exponentialRampToValueAtTime(100, 1.2);

  // gain.gain.setValueAtTime(.0001, 1);
  // gain.gain.exponentialRampToValueAtTime(.3, 1.01);
  // gain.gain.exponentialRampToValueAtTime(.0001, 1.2);

  // // SNARE NOISE
  // var snareNoise = noise(oac).connect(oac.createGain());
  // snareNoise.gain.setValueAtTime(0, 0);
  // snareNoise.gain.setValueAtTime(0, 1);
  // snareNoise.gain.exponentialRampToValueAtTime(.4, 1.001);
  // snareNoise.gain.exponentialRampToValueAtTime(.001, 2);

  // var snf = oac.createBiquadFilter();
  // //snf.frequency.value = 1000;
  // snf.frequency.setValueAtTime(2000, 1);
  // snf.frequency.setTargetAtTime(500, 1, 1);
  // //snareNoise.connect(snf).connect(oac.destination);

  gain.connect(oac.destination);

  oac.oncomplete = e => {
    sampler.buffer = e.renderedBuffer;
    sampler.start(16);
  };

  oac.startRendering();

  out.gain.setValueAtTime(1, 40);
  out.gain.exponentialRampToValueAtTime(0.00001, 60);
}
