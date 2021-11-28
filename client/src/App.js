import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Form from './components/Form'
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path= '/' element={<LandingPage />} />
          <Route path= '/home' element={<Home />} />
          <Route path= '/character' element={<Form />} />
          <Route path= '/character/:id' element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
