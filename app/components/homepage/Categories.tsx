const Categories = () => {
  return (
    <section className="pb-16">
  <h2 className="text-center text-2xl font-semibold mb-8">SHOP BY CATEGORY</h2>

  <div className="flex w-full max-w-7xl mx-auto h-[300px] sm:h-[400px] md:h-[500px]">
    {/* Left Half */}
    <div className="w-1/2 p-2 flex flex-col justify-center">
      <div className="relative w-full h-[200px] md:h-[300px] mb-4 rounded-md overflow-hidden">
        <img
          src="/images/Category/Image1.png"
          alt="Tuna Cuts"
          className="object-cover w-full h-full rounded-md"
          loading="lazy"
        />
      </div>

      <div className="text-center">
        <button
          type="button"
          className="bg-[#f68b1f] font-black tracking-widest text-left transform scale-100 transition duration-200 ease-in-out hover:scale-115 hover:bg-black text-white px-6 py-3 rounded"
          style={{ letterSpacing: '0.25em' }}
        >
          Seafood
        </button>
      </div>
    </div>

    {/* Right Half */}
    <div className="w-1/2 p-2 flex flex-col justify-center">
      <div className="relative w-full h-[200px] md:h-[300px] mb-4 rounded-md overflow-hidden">
        <img
          src="/images/Category/Image2.png"
          alt="Tuna Cuts"
          className="object-cover w-full h-full rounded-md"
          loading="lazy"
        />
      </div>

      <div className="text-center">
        <button
          type="button"
          className="bg-[#f68b1f] font-black tracking-widest text-left transform scale-100 transition-transform transition-colors duration-200 ease-in-out hover:scale-115 hover:bg-black text-white px-6 py-3 rounded"
          style={{ letterSpacing: '0.25em' }}
        >
          Farm
        </button>
      </div>
    </div>
  </div>
</section>

  );
}

export default Categories;