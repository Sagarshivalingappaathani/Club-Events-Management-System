"use client";
import "../styles/global.css"
import Hero from "@/components/Hero"
import About from '@/components/About';
import Skp from '@/components/Skp'
import Footer from "@/components/Footer";
import Stories from '@/components/Stories'
import  Navbar from "@/components/Navbar";

const Home = () => (
  <>
    <Navbar/>
    <Skp/>
    <About/>
    <Footer/>
  </>
);

export default Home;

