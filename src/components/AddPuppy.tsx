import React, { useState } from 'react';

const AddPuppy : React.FC = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = { name, breed, size, age };
      const response = await fetch('http://localhost:5050/api/puppies/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error, 'Failed to add puppy')
    }
  };
  
  return (
    <section className='flex justify-center space-x-6 p-6 bg-white w-max mx-auto content-center rounded-lg'>
      <h2 className='text-2xl '>Add your pet:</h2>
      <form   
       className='content-center'    
        onSubmit={onSubmitForm}
      >
          <div className='flex flex-row space-x-6 content-center'>
            <label htmlFor='name'>Name</label>
            <input className='border rounded-lg' type='text' id='name' onChange={(event) => setName(event.target.value)} />
            <br></br>
            <label htmlFor='breed'>Breed: </label>
            <select id='breed' onChange={(event) => setBreed(event.target.value)}>
              <option value='Dog'>--Select a type--</option>
              <option value='Dog'>Dog</option>
              <option value='Cat'>Cat</option>
              <option value='Hamster'>Hamster</option>
              <option value='Guinea pig'>Guinea pig</option>
              <option value='Fish'>Fish</option>
              <option value='Bird'>Bird</option>
              <option value='Ferret'>Ferret</option>
              <option value='Gecko'>Gecko</option>
              <option value='Parrot'>Parrot</option>
              <option value='Mouse'>Mouse</option>
              <option value='Rabbit'>Rabbit</option>
              <option value='Snake'>Snake</option>
              <option value='Tortoise'>Tortoise</option>
            </select>
            <br></br>
            <label htmlFor='size'>Size: </label>
            <select id='size' onChange={(event) => setSize(event.target.value)}>
              <option value='S'>--Select a size--</option>
              <option value='XXS'>XXS</option>
              <option value='XS'>XS</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
            </select>
            <br></br>
            <label htmlFor='age'>Age: </label>
            <input className='border rounded-lg' type='text' id='age' onChange={(event) => setAge(event.target.value)} /> 
            <button className='bg-green-700 px-3 py-1 rounded-3xl' type='submit'><i className="fa-solid fa-plus text-white"></i></button>
          </div>
      </form>
    </section>
  )
};

export default AddPuppy;
