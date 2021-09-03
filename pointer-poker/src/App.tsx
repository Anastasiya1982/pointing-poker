import React from 'react';
import style from './App.module.css';
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chat from "./pages/ChatComponent/Chat";


function App() {
  return (
    <div className={style.App}>
        <Header/>
        <>
        <Main/>
        <Chat/>
        {/*<Game/>*/}
        {/*<LobbyPage/>*/}
        {/*<Results/>*/}
        </>
        <Footer/>
    </div>
  );
}

export default App;
