import React, { useEffect, useState } from 'react'
import { IPuppy } from '../types/types';
import puppyImg from '../puppy.jpeg'


const DisplayPuppies: React.FC = () => {
  const [puppies, setPuppies] = useState<Array<IPuppy>>([]);
  // const [updatePuppy, setUpdatePuppy] = useState({
  //   _id: '',
  //   name: '', 
  //   breed: '',
  //   size: '',
  //   age: 0
  // })

  useEffect(() => {
    getPuppiesData();
  }, []);

  const getPuppiesData = () => {
    fetch('http://localhost:5050/api/puppies/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setPuppies(data)
      })
      .catch(error => console.log(error));
  };

  console.log(puppies)

  const removePuppy = async (_id: string) => {
    console.log(_id);
    const delPup = await fetch(`http://localhost:5050/api/puppies/${_id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      if (!response) {
        throw new Error('Error in deleting puppy')
      }
      getPuppiesData()
      setPuppies(puppies.filter((puppy) => puppy._id !== _id));
      console.log(delPup);
    })
    .catch(error => {
      console.log(error)
    })
  }

  // const updatePuppyData = ({_id, name, breed, size, age} : IPuppy): void => {
  //   const body = { name, breed, size, age };
  //   fetch(`http://localhost:5050/api/puppies/${_id}`, {
  //     method: 'PUT',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body)
  //   })
  //   .then(response => {
  //     if (!response) {
  //       throw new Error('Error in updating puppy')
  //     }
  //     getPuppiesData()
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

  // const img = 

  return (
    <>
      <section className="listContainer">
        {puppies.map((puppy: IPuppy): JSX.Element => {
          return (
            <div className='bg-white' key={puppy._id}>
              <article className=''> 
              <img className='mx-16 my-10' src={`../assets/${puppy.breed}.png`} alt='puppy-drawing' width='100' />              
                <div className=''>
                  <h3 className='mt-6 text-xl' >{puppy.name}</h3>
                  <p>Type: {puppy.breed}</p>
                  <p>Size: {puppy.size}</p>
                  <p>Age: {puppy.age}</p>
                </div>
                {/* <button onClick={(event) => {
                  event.stopPropagation();
                  setUpdatePuppy({
                    _id: puppy._id,
                    name: puppy.name,
                    breed: puppy.breed,
                    size: puppy.size,
                    age: puppy.age
                  })
                }}>Edit
                </button> */}
                <button onClick={(event) => {
                  event.stopPropagation();
                  removePuppy(puppy._id)
                }}>
                  Remove
                </button>
              </article>
            </div>
          )
        
        })}
      </section>
    </>
  )
}

export default DisplayPuppies