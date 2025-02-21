import React from 'react';
import Banner from '../components/Banner';
import PaginatedItems from '../components/PaginatedItems';


const Homepage = () => {
  return ( 
    <div className='bg-black w-full bg-cover bg-center' style={{backgroundImage: `url(${"https://i.ibb.co/3NQHRs9/banner.jpg"})`}}>
      <Banner/>
      <PaginatedItems/>
    </div>
  );
}
 
export default Homepage; 