// SVG spider-web generator utilities
export function buildWeb({ radius = 180, rings = 5, spokes = 12, cx = 0, cy = 0 }) {
  const spokesPaths = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const x = cx + Math.cos(a) * radius;
    const y = cy + Math.sin(a) * radius;
    spokesPaths.push(`M ${cx} ${cy} L ${x} ${y}`);
  }
  const ringPaths = [];
  for (let r = 1; r <= rings; r++) {
    const rr = (r / rings) * radius;
    const pts = [];
    for (let i = 0; i <= spokes; i++) {
      const a = (i / spokes) * Math.PI * 2;
      const jitter = 1 - (r % 2 === 0 ? 0.04 : -0.04);
      const px = cx + Math.cos(a) * rr * jitter;
      const py = cy + Math.sin(a) * rr * jitter;
      pts.push(`${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`);
    }
    ringPaths.push(pts.join(' '));
  }
  return { spokes: spokesPaths, rings: ringPaths };
}
