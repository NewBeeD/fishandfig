// import {Image} from '@shopify/hydrogen';
import { Link } from 'react-router';


const MainSection = () => {
  return (
    // <div className="relative h-55 md:65 mt-32 md:mt-0 pt-64">

    //   {/* image */}

    //   <div className="absolute top-0 left-0 w-max h-max -z-1">

    //   </div>


    //   {/* Box Content */}

    //   <div className="absolute top-0 left-0 w-max h-max flex flex-col justify-center align-center z-1 white p-2 text-center bg-[radial-gradient(circle,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.3)_70%,_rgba(0,0,0,0.7)_100%)]">

    //     <h1 className="max-w-600 text-sm">

    //       Serving the highest quality produce to our quality customers.

    //     </h1>

    //   </div>


    //   Enter
    // </div>
    <section className="relative h-[55vh] sm:h-[65vh] mt-[50px] sm:mt-0 pt-16 ">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="/images/Section1/MainImage2.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white p-8 text-center bg-[radial-gradient(circle,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.3)_70%,_rgba(0,0,0,0.7)_100%)]">
        <h1 className="max-w-[600px] text-[1.5rem]">
          Serving the highest quality produce to our quality customers.
        </h1>

        <Link to="/collections/fruits">
          <button className="mt-8 w-[150px] h-[60px] text-[20px] font-extrabold bg-[#f68b1f] transform scale-100 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-black">
            SHOP NOW
          </button>
        </Link>
      </div>
    </section>
    
  );
}

export default MainSection;