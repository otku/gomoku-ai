# Gomoku
Simple gomoku multiplayer game, created for learning Node.js and Socket.io.

## Description of application

This is a simple gomoku game for two people. During the game, only professional rules of the game are taken into account to ensure the best balance. These rules include:
- the first move for blacks must be in the center of the board,
- whites can move where they want during their moves,
- the second move for blacks must be outside the 5x5 field in the center of the board

For each movement, each player has 15 seconds, if any player exceeds his time he loses. Also if any of the players leave their room, he loses.

## Getting Started

If you want to play this game, you have to download all files from this repository. Then:
- Run ```npm install```
- Run ```npm start```
- Go to ```http://localhost:8888/``` and play with your friend on other browser.

This game works in 100% fine on Chrome and Firefox.
