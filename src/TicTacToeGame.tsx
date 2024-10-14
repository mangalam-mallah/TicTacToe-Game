import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Initial state of the tic tac toe board
const initialBoard: (string | null)[] = Array(9).fill(null);

const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(initialBoard); // Board state
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); // Player X's turn
  const [winner, setWinner] = useState<string | null>(null); // Winner of the game

  // Check for a winner whenever the board state changes
  useEffect(() => {
    checkWinner();
  }, [board]);

  // Check winner
  const checkWinner = () => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((square) => square)) {
      setWinner('draw');
    }
  };

  // Handle square press
  const handleSquarePress = (index: number) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = isPlayerTurn ? 'X' : 'O';
      setBoard(newBoard);
      setIsPlayerTurn(!isPlayerTurn);
    }
  };

  // Game reset
  const handleReset = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: 3 }, (_, colIndex) => {
              const index = rowIndex * 3 + colIndex;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.square}
                  onPress={() => handleSquarePress(index)}
                >
                  <Text
                    style={[
                      styles.squareText,
                      { color: board[index] === 'X' ? '#435585' : '#E5C3A6' },
                    ]}
                  >
                    {board[index] ? board[index].toString() : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      <Text style={styles.result}>
        {winner
          ? winner === 'draw'
            ? "It's a draw"
            : `Player ${winner} wins!`
          : `Player ${isPlayerTurn ? 'X' : 'O'}'s turn`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#363062',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 36,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#363062',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#363062',
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginHorizontal: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TicTacToeGame;
