/*
1. Fügt ein kontrolliertes Text-Input-Element hinzu.
2. Wenn der Text sich ändert, soll der Inhalt des
Input-Elements an unsere shuffletext-Schnittstelle gesendet
werden, der Antwort-Text soll in einem strong-Element
mit der Klasse .big-text angezeigt werden.
3. Die Komponente auf z.B. der Startseite einsetzen.
4. Bonus: Nutzt den Hook useDebouncedValue
*/

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import { useEffect, useState } from 'react';

export default function ShuffleText() {
  const [text, setText] = useState('');
  const [shuffledText, setShuffledText] = useState('');

  const debouncedText = useDebouncedValue(text, 400);
  useShuffledText(debouncedText, setShuffledText);
  return (
    <div>
      <label htmlFor='text'>Text</label>
      <br />
      <input id='text' value={text} onChange={(e) => setText(e.target.value)} />
      <strong className='big-text'>
        {[...shuffledText].map((char) => (
          <span
            key={Math.random()}
            style={{
              '--delay': `${(Math.random() * 1).toFixed(2)}s`,
            }}>
            {char}
          </span>
        ))}
      </strong>
    </div>
  );
}

function useShuffledText(text, setShuffledText) {
  useEffect(() => {
    async function fetchText() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/shuffletext?text=${text}`
        );

        if (!response.ok) {
          throw new Error('Problem beim Laden der Daten!');
        }

        const jsonData = await response.json();

        setShuffledText(jsonData.text);
      } catch (error) {
        console.log(error);
        setShuffledText('');
      }
    }
    fetchText();
  }, [text]);
}
