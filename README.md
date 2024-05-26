# MAZA Visulization 
MAZA stands for Maze Alogrithm is a project that showcase different algorthims used for generating a Maze and various Search Alogrithm to show how to get from point A to B. 

## Website
[View Project here !](https://maza-visulization.vercel.app/)

## Made With

<div>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react icon">
  </br>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript icon">
  </br>
  <img src="https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <br>
  <img src="https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
</div>

## Maze Generation 

- **Recursive Backtracking**: First choose a starting point in the field (for our case is always the first block), than randomly choose a wall at that point and carve a passage through to the adjacent block, but only if the adjacent block has not been visited yet. If all adjacent blocks have been visited, back up to the last block that has uncarved walls and repeat. The algorithm ends when the process has backed all the way up to the starting point.
- **Binary Tree**: First choose a starting point in the field (for our case is always the first block). For each block, randomly carve a passage either to the north or to the east, but only if the adjacent block in that direction exists. If neither direction is available, move to the next block in the grid. The algorithm continues until all blocks have been processed. For the case of Binary Tree we can switch it up with north/east, south/west, or south/east but I decide to use North and East.
- **Prim**: Prim's algorithm begins by choosing a random starting block. It then adds all walls of the initial block to a list. The algorithm randomly selects a wall from the list and carves a passage through to the adjacent block, but only if the adjacent block has not been visited yet. This new block's walls are then added to the list. If a wall leads to an already visited block, it is discarded. The process repeats until all blocks have been visited, resulting in a fully generated maze.
- **Kruskal**: Kruskal's algorithm starts by initializing each block as its own set. It then randomly simply select an edge at random, and join the blocks it connects if they are not already connected by a path. The algorithm continues selecting and removing walls until all blocks are connected, ensuring that no cycles are formed. This process results in a maze where each block is reachable from any other block.


