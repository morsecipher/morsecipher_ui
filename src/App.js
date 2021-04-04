import React, { useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const input = useRef();
  const submitBtn = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    disableButton(submitBtn.current);

    const payload = {
      text: input.current.value,
      adapter: 'midi',
    };
    const endpoint = `${process.env.REACT_APP_API_URL}/api/v1/interpetor`;

    axios
      .post(endpoint, payload)
      .then((result) => {
        console.log(result);
        enableButton(submitBtn.current);
      })
      .catch((error) => {
        console.log(error);
        enableButton(submitBtn.current);
      });
  };

  const disableButton = (btn) => {
    btn.disabled = true;
    btn.classList.add('disabled');
  };

  const enableButton = (btn) => {
    btn.disabled = false;
    btn.classList.remove('disabled');
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Convert to Morse!</p>
        <form onSubmit={onSubmit} data-confirm='Really?'>
          <input type='text' name='phrase' ref={input} />
          <br />
          <input type='submit' value='Submit' ref={submitBtn} />
        </form>
      </header>
    </div>
  );
}

export default App;
