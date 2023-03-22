import { useEffect, useState } from "react";
import { PuppieData } from "./types";
import Header from "./Components/Header/Header";
import MainContainer from "./Components/Main/MainContainer";
import Form from "./Components/Form/Form";
import './index.css';

const App = () => {
  const [puppies, setPuppies] = useState<PuppieData[]>([{} as PuppieData]);

  const getPuppiesData = () => {
    fetch('http://localhost:8080/api/puppies/', {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => setPuppies(data))
      .catch(error => console.log(error));
  }

  const addNewPuppy = (name: string | undefined, breed: string | undefined, birthDate: string | undefined) => {
    fetch(`http://localhost:8080/api/puppies/`, { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ name,  breed, birthDate })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('An Error ocurred');
        }
        getPuppiesData();
      })
      .catch(error => {
        console.log(error)
      });
  }

  const updatePuppy = ({id, name, breed, birthDate}: PuppieData):void=> {
    fetch(`http://localhost:8080/api/puppies/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ id, name,  breed, birthDate })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('An Error ocurred');
        }
        getPuppiesData();
      })
      .catch(error => {
        console.log(error)
      });
  }

  const deletePuppy = (id: string) => {
    fetch(`http://localhost:8080/api/puppies/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('An Error ocurred');
        }
        getPuppiesData();
      })
      .catch(error => {
        console.log(error)
      });
  }

  useEffect(() => {
    getPuppiesData();
  }, [])

  return (
    <div className="App">
      <Header title="Puppies API with TypeScript"/>
      <Form addNewPuppy={addNewPuppy} />
      <MainContainer updatePuppy={updatePuppy} deletePuppy={deletePuppy} puppies={puppies} />
    </div>
  );
}

export default App;