import './App.css';
import AltaRegistro from './components/AltaRegistro';
import ModificacionRegistro from './components/ModificacionRegistro';
import PantallaInicial from './components/PantallaInicial';
import { useServices } from './useServices';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const registers = useServices();
  return (
    <div className="App">

<BrowserRouter>
    <Routes>
      <Route path="/" element={<PantallaInicial registers={registers} />} />
      <Route path="/alta" element={<AltaRegistro />} />
      <Route path="/editar" element={<ModificacionRegistro/>} />   
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
