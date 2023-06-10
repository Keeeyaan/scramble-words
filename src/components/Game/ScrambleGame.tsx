import { useState, useEffect, SetStateAction } from 'react';

const ScrambleGame = () => {
  const [scrambledWord, setScrambledWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [userInput, setUserInput] = useState('');

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
      fetchRandomWord();
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
      checkAnswer();
    }
  };

  useEffect(() => {
    // Fetch words and set a random scrambled word
    fetchRandomWord();
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 justify-between items-center">
      <h1 className="text-white font-bold text-3xl mb-4">{scrambledWord}</h1>

      <div>
        <input
          className="bg-slate-800 p-2 rounded text-white w-[500px]"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default ScrambleGame;
