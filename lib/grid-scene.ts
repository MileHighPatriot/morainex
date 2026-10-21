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

export function mountGrid(canvas: HTMLCanvasElement, hero: HTMLElement): Stop {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: true,
    powerPreference: "low-power",
  });
  if (!gl) return () => {};

  const vs = compile(
    gl,
    gl.VERTEX_SHADER,
    `attribute vec2 aPos;
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
}`,
  );
  const fs = compile(
    gl,
    gl.FRAGMENT_SHADER,
    `precision mediump float;
varying vec4 vColor;
uniform float uPoint;
void main() {
  if (uPoint > 0.5) {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    if (dot(c, c) > 1.0) discard;
  }
  gl_FragColor = vColor;
}`,
  );
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
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const cols = 8;
  const rows = 5;
  const nodes: { x: number; y: number; z: number }[] = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      nodes.push({
        x: (x / (cols - 1)) * 2 - 1,
        y: (y / (rows - 1)) * 1.15 - 0.55,
        z: Math.sin(x * 0.8 + y * 1.3) * 0.35,
      });
    }
  }
  const edges: [number, number][] = [];
  nodes.forEach((_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    if (x < cols - 1) edges.push([i, i + 1]);
    if (y < rows - 1) edges.push([i, i + cols]);
  });

  let frame = 0;
  let running = true;
  let visible = true;
  const reduceHold = { scroll: 0 };

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const project = (x: number, y: number, z: number, time: number, scroll: number) => {
    const wobble = Math.sin(time * 0.4 + x * 2.4 + y * 1.7) * 0.07;
    const zz = z + wobble + scroll * 0.45;
    const p = 1.45 / (2.35 - zz);
    return {
      x: (x * p * 0.92 * 0.5 + 0.5) * canvas.width,
      y: ((-y * p * 0.72 + scroll * 0.06) * 0.5 + 0.48) * canvas.height,
      s: Math.max(2, 4.2 * p * Math.min(window.devicePixelRatio || 1, 1.5)),
    };
  };

  const draw = (timeMs: number) => {
    if (!running) return;
    frame = window.requestAnimationFrame(draw);
    if (!visible || document.hidden) return;
    resize();
    const rect = hero.getBoundingClientRect();
    const view = window.innerHeight || 1;
    reduceHold.scroll = Math.max(0, Math.min(1, -rect.top / view));
    const time = timeMs * 0.001;
    const pts = nodes.map((n) => project(n.x, n.y, n.z, time, reduceHold.scroll));
    const line: number[] = [];
    const dots: number[] = [];
    const push = (bucket: number[], x: number, y: number, r: number, g: number, b: number, a: number, size: number) => {
      bucket.push(x, y, r, g, b, a, size);
    };
    edges.forEach(([a, b], index) => {
      const pa = pts[a];
      const pb = pts[b];
      push(line, pa.x, pa.y, 0.227, 0.561, 0.851, 0.35, 1);
      push(line, pb.x, pb.y, 0.663, 0.804, 0.933, 0.28, 1);
      const t = (time * 0.18 + index * 0.09) % 1;
      push(
        dots,
        pa.x + (pb.x - pa.x) * t,
        pa.y + (pb.y - pa.y) * t,
        0.663,
        0.804,
        0.933,
        0.95,
        Math.max(pa.s, pb.s) * 0.9,
      );
    });
    pts.forEach((p, i) => {
      const ice = i % 9 === 0;
      push(dots, p.x, p.y, ice ? 0.663 : 0.227, ice ? 0.804 : 0.561, ice ? 0.933 : 0.851, 0.95, p.s * 2.1);
    });
    const data = line.concat(dots);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);

    const edgeVerts = edges.length * 2;
    gl.uniform1f(uPoint, 0);
    gl.drawArrays(gl.LINES, 0, edgeVerts);
    gl.uniform1f(uPoint, 1);
    gl.drawArrays(gl.POINTS, edgeVerts, dots.length / 7);
    if (canvas.dataset.ready !== "true") canvas.dataset.ready = "true";
  };

  resize();
  frame = window.requestAnimationFrame(draw);
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
    },
    { threshold: 0 },
  );
  io.observe(hero);

  return () => {
    running = false;
    window.cancelAnimationFrame(frame);
    io.disconnect();
    const lose = gl.getExtension("WEBGL_lose_context");
    lose?.loseContext();
  };
}
