import './App.css';
import {Route} from "react-router-dom";
import Landing from "./Components/Landing"
import Home from './Components/Home/Home';
import Details from './Components/VideoGames/Details';
import NavBar from './Components/NavBar/NavBar';
import CreateVideoGame from "../src/Components/CreateVideoGame/CreateVideoGame"



function App() {
  return (
    <div className="App">
      <Route exact path="/"><Landing/></Route>
      <Route path="/videogames"><NavBar/></Route>
      <Route exact path="/videogames"><Home/></Route>
      <Route exact path = "/videogames/:id"><Details/></Route>
      <Route path= "/videogames/create"><CreateVideoGame/></Route>
    </div>
  );
}

export default App;
