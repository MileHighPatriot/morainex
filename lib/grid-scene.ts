type Stop = () => void;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const VS = `attribute vec2 aPos;
attribute vec4 aColor;
attribute float aSize;
uniform vec2 uRes;
varying vec4 vColor;
void main() {
  vec2 clip = (aPos / uRes) * 2.0 - 1.0;
  clip.y = -clip.y;
  gl_Position = vec4(clip, 0.0, 1.0);
  gl_PointSize = aSize;
  vColor = aColor;
}`;

const FS = `precision mediump float;
varying vec4 vColor;
uniform float uPoint;
void main() {
  float a = 1.0;
  if (uPoint > 0.5) {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float d = dot(c, c);
    if (d > 1.0) discard;
    a = exp(-d * 4.0) + smoothstep(0.18, 0.0, d) * 0.9;
  }
  gl_FragColor = vec4(vColor.rgb * vColor.a * a, vColor.a * a);
}`;

const BLUE = [0.227, 0.561, 0.851];
const ICE = [0.663, 0.804, 0.933];
const WHITE = [0.95, 0.95, 0.94];

export function mountGrid(canvas: HTMLCanvasElement, hero: HTMLElement): Stop {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
    powerPreference: "low-power",
  });
  if (!gl) return () => {};
  const vs = compile(gl, gl.VERTEX_SHADER, VS);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return () => {};
  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return () => {};
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  const aPos = gl.getAttribLocation(program, "aPos");
  const aColor = gl.getAttribLocation(program, "aColor");
  const aSize = gl.getAttribLocation(program, "aSize");
  const uRes = gl.getUniformLocation(program, "uRes");
  const uPoint = gl.getUniformLocation(program, "uPoint");
  gl.enableVertexAttribArray(aPos);
  gl.enableVertexAttribArray(aColor);
  gl.enableVertexAttribArray(aSize);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 28, 0);
  gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 28, 8);
  gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 28, 24);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const small = window.innerWidth < 700;
  const cols = small ? 11 : 21;
  const rows = small ? 10 : 12;
  const nodes: { x: number; z: number; h: number }[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      nodes.push({ x: ((c / (cols - 1)) * 2 - 1) * 1.6, z: r / (rows - 1), h: Math.sin(c * 1.7 + r * 2.3) * 0.5 + 0.5 });
    }
  }
  const neighbors = (i: number) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const out: number[] = [];
    if (c > 0) out.push(i - 1);
    if (c < cols - 1) out.push(i + 1);
    if (r > 0) out.push(i - cols);
    if (r < rows - 1) out.push(i + cols);
    return out;
  };
  const edges: [number, number][] = [];
  nodes.forEach((_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    if (c < cols - 1 && (r + c) % 3 !== 1) edges.push([i, i + 1]);
    if (r < rows - 1 && (r * 7 + c) % 4 !== 2) edges.push([i, i + cols]);
  });
  const glow = new Float32Array(nodes.length);
  const pulseCount = small ? 12 : 28;
  const lineBuf = new Float32Array(edges.length * 2 * 7);
  const dotBuf = new Float32Array((nodes.length + pulseCount * 10) * 7);
  const data = new Float32Array(lineBuf.length + dotBuf.length);

  type Pulse = { from: number; to: number; t: number; speed: number; trail: { x: number; y: number }[] };
  const pulses: Pulse[] = Array.from({ length: pulseCount }, () => {
    const from = Math.floor(Math.random() * nodes.length);
    const n = neighbors(from);
    return { from, to: n[Math.floor(Math.random() * n.length)], t: Math.random(), speed: 0.9 + Math.random() * 1.2, trail: [] };
  });

  const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: -9999, py: -9999 };
  const onMove = (e: PointerEvent) => {
    const rect = hero.getBoundingClientRect();
    mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouse.px = e.clientX - rect.left;
    mouse.py = e.clientY - rect.top;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let frame = 0;
  let running = true;
  let visible = true;
  let last = 0;
  let dpr = 1;

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const project = (n: { x: number; z: number; h: number }, time: number, scroll: number) => {
    const W = canvas.width;
    const H = canvas.height;
    const tilt = 0.55 + scroll * 0.35 + mouse.y * 0.06;
    const depth = 1 + n.z * 3.2 - scroll * 0.6;
    const p = 1 / Math.max(0.35, depth);
    const lift = Math.sin(time * 0.6 + n.x * 3 + n.z * 5) * 0.025 + n.h * 0.02;
    const cx = small ? 0.5 : 0.64;
    const x = cx * W + (n.x * 1.3 + mouse.x * 0.1 * (1 - n.z)) * p * W * 0.5;
    const horizon = H * (0.4 - scroll * 0.12);
    const y = horizon + p * H * 0.7 * tilt - lift * p * H;
    return { x, y, s: p, z: n.z };
  };

  const draw = (timeMs: number) => {
    if (!running) return;
    frame = window.requestAnimationFrame(draw);
    if (!visible || document.hidden) return;
    if (small && timeMs - last < 30) return;
    const dt = Math.min(0.05, last ? (timeMs - last) / 1000 : 0.016);
    last = timeMs;
    resize();
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    const rect = hero.getBoundingClientRect();
    const scroll = Math.max(0, Math.min(1, -rect.top / (window.innerHeight || 1)));
    const time = timeMs * 0.001;
    const pts = nodes.map((n) => project(n, time, scroll));
    const fade = (z: number) => Math.max(0, 1 - z * 0.95);
    let li = 0;
    let di = 0;
    const line = lineBuf;
    const dots = dotBuf;
    const push = (b: Float32Array, x: number, y: number, c: number[], a: number, size: number) => {
      let o = b === lineBuf ? li : di;
      b[o++] = x; b[o++] = y; b[o++] = c[0]; b[o++] = c[1]; b[o++] = c[2]; b[o++] = a; b[o++] = size;
      if (b === lineBuf) li = o; else di = o;
    };
    edges.forEach(([a, b]) => {
      const pa = pts[a];
      const pb = pts[b];
      push(line, pa.x, pa.y, BLUE, 0.45 * fade(pa.z) + glow[a] * 0.5, 1);
      push(line, pb.x, pb.y, ICE, 0.35 * fade(pb.z) + glow[b] * 0.5, 1);
    });
    const mx = mouse.px * dpr;
    const my = mouse.py * dpr;
    pts.forEach((p, i) => {
      const d = Math.hypot(p.x - mx, p.y - my) / (160 * dpr);
      const near = Math.max(0, 1 - d);
      glow[i] = Math.max(glow[i] * Math.pow(0.12, dt), near * 0.9);
      const g = glow[i];
      push(dots, p.x, p.y, g > 0.3 ? ICE : BLUE, (0.65 + g * 0.35) * fade(p.z) + 0.08, (7 + g * 16) * p.s * dpr * 1.6);
    });
    pulses.forEach((pl) => {
      pl.t += dt * pl.speed;
      if (pl.t >= 1) {
        glow[pl.to] = 1;
        const n = neighbors(pl.to).filter((k) => k !== pl.from);
        pl.from = pl.to;
        pl.to = n[Math.floor(Math.random() * n.length)];
        pl.t = 0;
      }
      const a = pts[pl.from];
      const b = pts[pl.to];
      const x = a.x + (b.x - a.x) * pl.t;
      const y = a.y + (b.y - a.y) * pl.t;
      pl.trail.unshift({ x, y });
      if (pl.trail.length > 10) pl.trail.pop();
      const s = a.s + (b.s - a.s) * pl.t;
      const f = fade(a.z + (b.z - a.z) * pl.t) + 0.1;
      pl.trail.forEach((tp, k) => {
        push(dots, tp.x, tp.y, k === 0 ? WHITE : ICE, (1 - k / 10) * 0.8 * f, (k === 0 ? 26 : 14 - k) * s * dpr * 1.4);
      });
    });
    data.set(line.subarray(0, li), 0);
    data.set(dots.subarray(0, di), li);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.bufferData(gl.ARRAY_BUFFER, data.subarray(0, li + di), gl.DYNAMIC_DRAW);
    gl.uniform1f(uPoint, 0);
    gl.drawArrays(gl.LINES, 0, li / 7);
    gl.uniform1f(uPoint, 1);
    gl.drawArrays(gl.POINTS, li / 7, di / 7);
    if (canvas.dataset.ready !== "true") canvas.dataset.ready = "true";
  };

  resize();
  frame = window.requestAnimationFrame(draw);
  const io = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
  });
  io.observe(hero);

  return () => {
    running = false;
    window.cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    io.disconnect();
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
