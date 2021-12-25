/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//Number of Nodes
const maxNodes = 120;
//Node Size
const nodeSize = 10;
//Max Distance of Nodes to build Edges
const maxNodeDist = 80;
//Min Distance of Nodes (To get no clutter)
const minNodeDist = 40;

//Holds all Nodes
let nodes = [];

function setup() {
  angleMode(DEGREES);
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  noFill();

  loopAnimation()
  setInterval(loopAnimation, 5000);
}


function breadthFirstSearch(startNodeNumber, endNodeNumber) {

  //Search-Queue
  let queue = [];
  //First Item in Queue
  queue.push(startNodeNumber);

  while (!!queue.length) {
    //Current Node in the Queue
    const currentNodeNumber = queue.shift();
    //Only check unsearched Nodes
    if (!nodes[currentNodeNumber].searched) {
      //Set Node to searched
      nodes[currentNodeNumber].searched = true;
      for (const neighbor of nodes[currentNodeNumber].neighbors) {
        if (!queue.includes(neighbor) && !nodes[neighbor].searched) {
          queue.push(neighbor);
          nodes[neighbor].parent = currentNodeNumber;
        }
      }
    }
  }
  reconstructPath(endNodeNumber);
}

function reconstructPath(endNodeNumber) {

  //Path, starting from the end
  let path = [];
  //Start with last node
  path.push(endNodeNumber);

  //Reconstruct the path
  while (true) {
    const node = nodes[path[0]]
    //Start-Node doesn't have a parent. As long as there are parents, keep going
    if (node.parent !== null) {
      path.unshift(node.parent);
    } else {
      break;
    }
  }
  console.log(path);
  drawPath(path);
}

function draw() {
}

function loopAnimation() {

  background(0)

  //Empty Nodes Array
  nodes = [];

  //Generates the Nodes
  generateNodes();
  //Connect Nodes
  connectNodes();

  //Finds start and end Nodes
  let startAndEnd = startEnd();
  //Start Node
  const startNode = startAndEnd.start.nodeNumber;
  //End Node
  const endNode = startAndEnd.end.nodeNumber;

  //Perform BFS
  breadthFirstSearch(startNode, endNode);

  //Draw all Nodes
  for (const node of nodes) node.display();

}
