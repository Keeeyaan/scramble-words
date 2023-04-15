import { useState, useEffect, SetStateAction } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Game = () => {
  const [scrambledWord, setScrambledWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);

  const fetchRandomWord = () => {
    // Fetch a random word from Wordnik API or use your own word list
    // For demonstration purposes, using a static word list
    const words = ['apple', 'banana', 'cherry', 'orange', 'grape'];
    const word = words[Math.floor(Math.random() * words.length)];
    setOriginalWord(word);
    setScrambledWord(scrambleWord(word));
  };

  const scrambleWord = (word: string): string => {
    let scrambled = word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    return scrambled === word ? scrambleWord(word) : scrambled;
  };

  const checkAnswer = () => {
    console.log(userInput, scrambledWord);
    if (userInput === originalWord) {
      setScore((score) => score + 1);
      fetchRandomWord();
      socket.emit('answer', 'world');
    }
    setUserInput('');
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      console.log('test');

      checkAnswer();
    }
  };

  useEffect(() => {
    // Fetch words and set a random scrambled word
    fetchRandomWord();
  }, []);

  return (
    <div className="min-h-screen justify-center flex items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white font-bold text-3xl mb-4">{scrambledWord}</h1>
        <input
          className="bg-slate-400 p-2 rounded-sm"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
};

export default Game;
