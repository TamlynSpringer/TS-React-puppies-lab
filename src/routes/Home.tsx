import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
import AddPuppy from '../components/AddPuppy';
import DisplayPuppies from '../components/DisplayPuppies';

const Home = () => {
  return (
    <>
    <AddPuppy />
    <DisplayPuppies />
    </>
  )
};

export default Home;