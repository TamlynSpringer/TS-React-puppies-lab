import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DisplayPuppies from './components/DisplayPuppies';
import AddPuppy from './components/AddPuppy';
import Home from './routes/Home';

const App: React.FC = () => {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddPuppy />} />
        <Route path='/puppies' element={<DisplayPuppies />} />
      </Routes>
    </div>   
      
  );
};

export default App;
