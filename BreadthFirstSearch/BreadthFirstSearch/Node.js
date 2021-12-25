//Node-Class
class Node {

  constructor(nodeNumber, x, y, size = 100, parent = null, neighbors = [], searched = false) {
    this.nodeNumber = nodeNumber;
    this.pos = new p5.Vector(x, y)
    this.size = size;
    this.parent = null;
    this.neighbors = [];
    this.searched = false;
    this.color = "lime"
  }
}

//Shows the Nodes
Node.prototype.display = function () {
  //Draw Node
  fill(this.color);
  stroke(this.color);
  ellipse(this.pos.x, this.pos.y, this.size);
  //Display Node Number
  fill(255);
  stroke(0);
  strokeWeight(3)
  text(this.nodeNumber, this.pos.x - 8, this.pos.y - 7);
}

function generateNodes() {
  //Keep generating Nodes until there
  while (nodes.length < maxNodes) {
    //Random X and Y for new Nodes
    const randomX = Math.round(random(20, width - 20));
    const randomY = Math.round(random(20, height - 20));
    //If the random values are not too close to other Nodes,
    //create a new Node and push it to nodes[]
    if (!nodes.filter((node) => dist(node.pos.x, node.pos.y, randomX, randomY) < minNodeDist).length) nodes.push(new Node(nodes.length, randomX, randomY, nodeSize))
  }
}

//Connects all the Nodes with Edges (Lines)
function connectNodes() {
  //For each Node....
  for (let currentNode of nodes) {
    //...check all other Nodes, and how close they are
    for (const node of nodes) {
      if (currentNode.pos !== node.pos
        && currentNode.pos.dist(node.pos) < maxNodeDist) {
        if (!currentNode.neighbors.includes(node.nodeNumber)) currentNode.neighbors.push(node.nodeNumber);
        stroke(0, 255, 0);
        strokeWeight(3)
        line(currentNode.pos.x, currentNode.pos.y, node.pos.x, node.pos.y);
      }
    }
  }
}

//Finds Start Node (Top Left) and End Node (Bottom Right)
function startEnd() {

  //Define Start and End Node
  let startNode = nodes[0];
  let endNode = nodes[0];

  //Go through all Nodes
  for (const node of nodes) {
    //Node must have neighbors
    if (!!node.neighbors.length) {
      //If the current Node's x and y are smaller than startNode's x and y,
      //the current node becomes the new startNode
      if (node.pos.x < startNode.pos.x
        && node.pos.y < startNode.pos.y) startNode = node;
      //If the current Node's x and y are bigger than endNode's x and y,
      //the current node becomes the new endNode
      if (node.pos.x > endNode.pos.x
        && node.pos.y > endNode.pos.y) endNode = node;
    }
  }

  //Highlight the Start end End Nodes
  startNode.start = true;
  endNode.end = true;
  startNode.color = "red";
  endNode.color = "red";
  startNode.size = nodeSize * 2;
  endNode.size = nodeSize * 2;
  return {
    start: startNode,
    end: endNode
  }
}

function drawPath(path) {
  while (path.length > 1) {
    const node = path.shift();
    stroke(255, 140, 0);
    strokeWeight(7);
    if (!nodes[node].start) nodes[node].color = "orange"
    line(nodes[node].pos.x, nodes[node].pos.y, nodes[path[0]].pos.x, nodes[path[0]].pos.y,)
  }
}