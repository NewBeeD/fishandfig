const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden mt-4 bg-white">
      <main className="flex flex-col space-y-12">

        {/* Hero Section */}
        <section className="w-full py-12 text-center bg-[url('/images/Section1/MainImage1.png')] bg-cover bg-center text-white shadow-md">
          <div className="w-[90%] m-auto bg-black/60 p-6 rounded-lg">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Fresh From Sea to Shelf</h1>
            <p className="text-lg sm:text-xl">
              Proudly Caribbean. Sustainably Sourced. Community Driven.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="w-full text-center">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-lg">
              We are passionate fishmongers from the heart of the Caribbean, bringing fresh island catches and produce to your plate. Our roots run deep in coastal traditions, and our commitment to sustainability ensures our sea remains abundant for future generations.
            </p>
          </div>
        </section>

        {/* Our Journey */}
        <section className="w-full text-center">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
            <p className="text-lg">
              It all started in a tight-knit fishing village where the ocean isn’t just scenery—it’s a way of life. What began as a family tradition has grown into a trusted business built on integrity and community.
            </p>
          </div>
        </section>

        {/* Sustainability */}
        <section className="w-full text-center">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">Sustainability First</h2>
            <p className="text-lg">
              We partner with local fishers using eco-friendly practices, ensuring we protect our marine life while delivering fresh, responsibly-sourced seafood.
            </p>
          </div>
        </section>

        {/* How We Work */}
        <section className="w-full text-center">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">From Boat to Table</h2>
            <p className="text-lg">
              Your fish is sourced directly from the boat, cleaned and processed under top hygiene standards, and swiftly delivered—keeping that just-caught freshness.
            </p>
          </div>
        </section>

        {/* Community */}
        <section className="w-full text-center">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">Our Community</h2>
            <p className="text-lg">
              We’re more than a business—we’re a bridge between hardworking fishers and happy homes. Every order supports livelihoods across the Caribbean.
            </p>
          </div>
        </section>

        {/* Location */}
        <section className="w-full text-center">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">Where We Operate</h2>
            <p className="text-lg">
              Based in Bioche, St. Peters, we serve customers across Dominica and beyond—bringing the taste of our waters to your doorstep.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="w-full text-center pb-12">
          <div className="w-[90%] m-auto">
            <h2 className="text-3xl font-semibold mb-4">Let’s Connect</h2>
            <p className="text-lg">
              Got questions? Special order? Wholesale inquiry? We’d love to hear from you!
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow">
              Contact Us
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
