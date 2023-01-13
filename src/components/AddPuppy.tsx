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
    <>
      <h2>Add your pup</h2>
      <form 
        className='form'
        onSubmit={onSubmitForm}
      >
          <div>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' onChange={(event) => setName(event.target.value)} />
            <br></br>
            <label htmlFor='breed'>Breed: </label>
            <input type='text' id='breed' onChange={(event) => setBreed(event.target.value)} />
            <br></br>
            <label htmlFor='size'>Size: </label>
            <select id='size' onChange={(event) => setSize(event.target.value)}>
              <option value='xs'>XS</option>
              <option value='s'>S</option>
              <option value='m'>M</option>
              <option value='l'>L</option>
              <option value='xl'>XL</option>
            </select>
            <br></br>
            <label htmlFor='gge'>Age: </label>
            <input type='text' id='age' onChange={(event) => setAge(event.target.value)} /> 
          </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )
};

export default AddPuppy;
