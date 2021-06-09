
import './css/App.css';
import './scss/style.scss';
import Body from "./components/body";
import Header from "./components/header";
// eslint-disable-next-line
import firebase from "firebase/app";






function App() {
  return (
    <div className="App">
      <Header />      
      <Body />
    </div>
  );
}

export default App;
