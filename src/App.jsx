import { useState } from 'react';
import { songs } from './data';
import CardLagu from './components/CardLagu';
import HappinessPage from './components/HappinessPage';
import './App.css';

function App() {
  const [openedStates, setOpenedStates] = useState(songs.map(() => false));
  const [showHappiness, setShowHappiness] = useState(false);

  const handleOpen = (index) => {
    setOpenedStates(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const allOpened = openedStates.every(v => v === true);

  const handleNext = () => {
    setShowHappiness(true);
  };

  if (showHappiness) {
    return <HappinessPage />;
  }

  return (
    <div className="app">
      <h1 className="title">songfess</h1>
      <p className="subtitle">sebuah suara untukmu</p>
      <div className="cards-container">
        {songs.map((lagu, index) => (
          <CardLagu
            key={lagu.id}
            lagu={lagu}
            index={index}
            isOpened={openedStates[index]}
            onOpen={() => handleOpen(index)}
          />
        ))}
      </div>
      {allOpened && (
        <div className="next-button-container">
          <button className="next-button" onClick={handleNext}>
            Lanjut ke pesan spesial →
          </button>
        </div>
      )}
      <div className="footer">Di dunia yang penuh drama ini, semoga kita bisa saling berbagi drama yang kita dapat baik itu drama sedih atau bahagia...</div>
    </div>
  );
}

export default App;