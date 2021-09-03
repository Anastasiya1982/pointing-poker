import React from 'react';
import style from './App.module.css';
import Game from "./pages/Game/Game";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LobbyPage from "./pages/Lobby/LobbyPage";
import Results from "./pages/Results/Results";

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
