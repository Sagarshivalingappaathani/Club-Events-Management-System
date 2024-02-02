import Cards from './Cards'
import  {Team} from './Team';

const cards = [
  {
    imagepath: '/Code.png',
    title:"Code",
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum justo ac malesuada ullamcorper.',
  },
  {
    imagepath: '/Capital.png',
    title:"Capital",
    details: 'Sed varius justo vel bibendum pellentesque. Fusce hendrerit urna non tortor eleifend, vel laoreet arcu euismod.',
  },
  {
    imagepath: '/Gadget.png',
    title:"Gadget",
    details: 'Proin nec ligula ut mauris fermentum pharetra. Integer vitae tortor sit amet velit ullamcorper efficitur.',
  },
  {
    imagepath: '/Garage.png',
    title:"Garage",
    details: 'Curabitur eu dolor vel nulla iaculis blandit. Suspendisse potenti. Integer congue orci vel ante eleifend.',
  },
  {
    imagepath: '/Media.png',
    title:"Media",
    details: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  },
  {
    imagepath: '/Robotics.png',
    title:"Robotics",
    details: 'Vestibulum id quam vel purus venenatis aliquet. Ut interdum odio ac purus tristique, ut congue arcu euismod.',
  },
  {
    imagepath: '/Tectonic.png',
    title:"Tectonic",
    details: 'Vestibulum id quam vel purus venenatis aliquet. Ut interdum odio ac purus tristique, ut congue arcu euismod.',
  },
  {
    imagepath: '/Script.png',
    title:"Script",
    details: 'Vestibulum id quam vel purus venenatis aliquet. Ut interdum odio ac purus tristique, ut congue arcu euismod.',
  },
];

const About = () => {
  
  return (
    <div>
       <div className="bg-gradient-to-b from-teal-500 to-teal-700 text-white text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-wide">About IE</h1>
          <p className="mx-12 text-lg md:text-xl mb-8 opacity-80">
            When you bring together people from different backgrounds, you'll be surprised how diverse their lines of thought are, and yet, you'll find them supporting your revolutionary ideas. This is IE NITK.
          </p>
          <button className="bg-white text-teal-700 hover:bg-teal-100 px-8 py-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Explore Our Innovations
          </button>
        </div>
      <Cards cards={cards} />
      <Team/>
    </div>
  );
};

export default About;
