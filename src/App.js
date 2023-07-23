import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from "react";

function App() {
  let wordTyped='';
  const [data, setData] = useState(null);
  console.log(data);
  const getData = async (word) => {
    wordTyped = word;
    let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let info = await response.data;
    console.log(response);
    setData(info[0]);

}

useEffect(()=> {
  getData();
},[])
const loaded = () => {

  return (
    
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <div className="search-box">
            <input type="text" placeholder="Type the word here..." id="inp-word" />
            <button id="search-btn" onClick={() => {
              getData(document.getElementById('inp-word').value)
              }}>Search</button>
          </div>
          <div id="result" className="result">
            <div className="word"><h3>{wordTyped}</h3></div>
            <div className="details">
              <p>{data.meanings[0].partOfSpeech}</p>
              <p>{data.phonetic}/</p>
            </div>
            <p className="word-meaning">
              {data.meanings[0].definitions[0].definition}
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

          // Function for when data doesn't exist
          const loading = () => {
            return <h1>Loading...</h1>;
        };
        
        // if coin has data, run the loaded function, otherwise, run loading
        return data && data.word ? loaded() : loading();
}

export default App;
