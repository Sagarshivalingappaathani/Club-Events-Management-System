import React from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
        <section className="h-screen bg-cover" style={{ backgroundImage: "url('./hero.png')" }}>
          <Navbar/>
          <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
            <div className="max-w-2xl text-center">
              <h1 className="font-sans  font-bold text-6xl text-teal-600">Welcome To IE NITK</h1>
              <p className="mt-6 lg:text-lg font-bold text-black">When you bring together people from different backgrounds, you'll be surprised how diverse their lines of thought are, and yet, you'll find them supporting your revolutionary ideas. This is IE NITK.</p>
              <div className="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                <div className="flex justify-center gap-2 md:justify-between">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none md:mr-10" role="button" >Join us</button>
                  <a href='/events' className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none" role="button">Events</a>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};

export default Home;
