/**
 * Graph view component — renders an identity evidence graph.
 * Uses simple SVG / Canvas rendering. Can be upgraded to D3 or Cytoscape.
 * @param {object} graphData - { nodes: [...], edges: [...] }
 * @param {HTMLElement} container
 */
export function renderGraphView(graphData, container) {
  container.innerHTML = "";

  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    container.innerHTML = '<p class="help-text">No graph data available.</p>';
    return;
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "300");
  svg.style.background = "var(--bg-primary)";

  const width = container.clientWidth || 600;
  const height = 300;
  const positions = {};

  // Simple circular layout
  graphData.nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / graphData.nodes.length;
    const cx = width / 2 + (width / 3) * Math.cos(angle);
    const cy = height / 2 + (height / 3) * Math.sin(angle);
    positions[node.id] = { cx, cy };
  });

  // Draw edges
  for (const edge of (graphData.edges || [])) {
    const from = positions[edge.source];
    const to = positions[edge.target];
    if (!from || !to) continue;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.cx);
    line.setAttribute("y1", from.cy);
    line.setAttribute("x2", to.cx);
    line.setAttribute("y2", to.cy);
    line.setAttribute("stroke", "#3a4067");
    line.setAttribute("stroke-width", "1.5");
    svg.appendChild(line);
  }

  // Draw nodes
  for (const node of graphData.nodes) {
    const { cx, cy } = positions[node.id];
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", node.type === "person" ? 18 : 12);
    circle.setAttribute("fill", getNodeColor(node.type));
    circle.setAttribute("stroke", "#6366f1");
    circle.setAttribute("stroke-width", "2");
    g.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", cx);
    text.setAttribute("y", cy + 30);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#9ca3b8");
    text.setAttribute("font-size", "11");
    text.textContent = node.label || node.id;
    g.appendChild(text);

    svg.appendChild(g);
  }

  container.appendChild(svg);
}

function getNodeColor(type) {
  switch (type) {
    case "person":   return "#6366f1";
    case "evidence": return "#22c55e";
    case "document": return "#3b82f6";
    case "family":   return "#f59e0b";
    default:         return "#9ca3b8";
  }
}
