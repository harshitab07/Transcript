import React, { useState, useEffect } from 'react';
import './Voice.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';


function Voice() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(()=>{
    handleListen()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening])

  const handleListen = () => {
    if(isListening){
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend=()=>{
        console.log('Stopped mic on click')
      }
    }
    mic.onstart = () => {
      console.log('Mic is ON')
    }
    mic.onresult = event => {
      const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
    <img id='bg' src='https://takenote.co/wp-content/uploads/2019/12/dissertation%20interview%20transcription%20guide%20to%20transcription%20services.jpg' alt='img' />
    <img id='bg-med' src='https://img.freepik.com/premium-photo/stack-books-with-headphones-tablets-wooden-background-concept-modern-technological-education-study-books_243391-991.jpg?w=2000' alt='img' />
    <img id='bg-sml' src='https://img.lovepik.com/background/20211101/medium/lovepik-indoor-study-mobile-phone-wallpaper-background-image_400618844.jpg' alt='img' />
    <h1>Transcript</h1>
      <div className="container">
        <div className="box">
          <h2>Speak Up</h2><br></br>
          {isListening ? <span id='icon'>🎤</span> : <span id='icon'>🔇</span>}
          <div className="buttons">
          <button onClick={()=> setIsListening(prevState => !prevState)}>{isListening ? <span>Stop</span> : <span>Start</span>}</button>
            <button onClick={handleSaveNote} disabled={!note}>Save</button>
            <button onClick={()=>setNote('')} disabled={!note}>🗘</button>
          </div>
          <p className='recordedNotes'>{note}</p>
        </div>
        <div className='box' id='trans-box'>
          <h2 id='notes'>Transcript</h2>
          {savedNotes.map(n => (<p key={n} className='recordedNotes'>{n}</p>))}
        </div>
      </div>
    </>

  );
}

export default Voice; 