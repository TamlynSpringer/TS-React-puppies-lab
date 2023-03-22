import React, { useEffect, useState } from 'react'
import { IPuppy } from '../types/types';

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

  const [flip, setFlip] = useState(false);

  return (
    <>
      <main className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 my-10 max-w-7.5xl mx-auto p-5'>
        {puppies.map((puppy: IPuppy): JSX.Element => {
          return (
            <section onClick={() => setFlip(!flip)} className='cursor-pointer'  key={puppy._id}>
              <article className={flip ? 'hidden' : ''}>
                <div className='h-auto w-full object-cover rounded-lg shadow-md bg-white'>
                  <img className='mx-10' src={`../assets/${puppy.breed}.png`} alt='pet-drawing' width='300' />
                  <div className='flex flex-row'>
                    <div className='mx-10 text-left flex-2'>
                      <h3 className='mt-6 text-2xl p-3' >{puppy.name}</h3>
                      <p className='text-lg p-3'>Type: {puppy.breed}</p>
                      <p className='text-lg p-3'>Size: {puppy.size}</p>
                      <p className='text-lg p-3'>Age: {puppy.age}</p>
                    </div>
                    <div className='mx-20 flex-1 flex flex-col justify-center space-y-6'>
                      <button 
                      
                        // onClick={(event) => {
                        //   event.stopPropagation();
                        //   setUpdatePuppy({
                        //     _id: puppy._id,
                        //     name: puppy.name,
                        //     breed: puppy.breed,
                        //     size: puppy.size,
                        //     age: puppy.age
                        //   })
                        // }}
                        className='bg-green-700 px-3 py-1 rounded-3xl' type='submit'><i className="fa-solid fa-pen-to-square text-white"></i>
                      </button>
                      <button 
                        onClick={(event) => {
                        event.stopPropagation();
                        removePuppy(puppy._id)
                        }}
                        className='bg-green-700 px-3 py-1 rounded-3xl' type='submit'><i className="fa-solid fa-delete-left text-white"></i></button>
                    </div>
                  </div>
                </div>
              </article>
              <div className={flip ? 'back h-72 w-full object-cover rounded-lg shadow-md p-10 bg-neutral-300' : 'hidden'} >
                <h3 className='mt-6 text-xl' >{puppy.name}</h3>
                <p>Type: {puppy.breed}</p>
                <p>Size: {puppy.size}</p>
                <p>Age: {puppy.age}</p>
                <br />
                
              </div>
                
            </section>
          )
        
        })}
      </main>
    </>
  )
}

export default DisplayPuppies