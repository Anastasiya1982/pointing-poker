import React from 'react';
import style from './App.module.css';
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div className={style.App}>
        <Header/>
        <>
        <Main/>
        {/*<Game/>*/}
        {/*<LobbyPage/>*/}
        {/*<Results/>*/}
        </>
        <Footer/>
    </div>
  );
}

export default App;
