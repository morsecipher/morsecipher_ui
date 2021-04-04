import React, { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const input = useRef();
  const submitBtn = useRef();
  const convertBtn = useRef();
  const [convertedText, setConvertedText] = useState('');

  const onPlay = (e) => {
    e.preventDefault();

    console.log('Playing!', input.current.value);

    const btnRef = submitBtn;
    disableButton(btnRef);

    const payload = {
      text: input.current.value,
      adapter: 'midi',
    };
    const endpoint = `${process.env.REACT_APP_API_URL}/api/v1/interpetor`;

    axios
      .post(endpoint, payload)
      .then((result) => {
        enableButton(btnRef);
      })
      .catch((error) => {
        console.log(error);
        enableButton(btnRef);
      });
  };

  const onConvert = (e) => {
    e.preventDefault();

    console.log('Converting!', input.current.value);

    const btnRef = convertBtn;
    disableButton(btnRef);

    const payload = {
      text: input.current.value,
    };
    const endpoint = `${process.env.REACT_APP_API_URL}/api/v1/encode`;

    axios
      .post(endpoint, payload)
      .then((result) => {
        setConvertedText(result.data.text);
        enableButton(btnRef);
      })
      .catch((error) => {
        console.log(error);
        enableButton(btnRef);
      });
  };

  const disableButton = (btnRef) => {
    btnRef.current.disabled = true;
    btnRef.current.classList.add('disabled');
  };

  const enableButton = (btnRef) => {
    btnRef.current.disabled = false;
    btnRef.current.classList.remove('disabled');
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Convert to Morse!</h1>
        <form>
          <input type='text' name='phrase' ref={input} />

          <br />
          <input
            type='submit'
            value='Convert'
            ref={convertBtn}
            onClick={onConvert}
          />
          <input type='submit' value='Play' ref={submitBtn} onClick={onPlay} />

          <pre>{convertedText}</pre>
        </form>
      </header>
    </div>
  );
}

export default App;
