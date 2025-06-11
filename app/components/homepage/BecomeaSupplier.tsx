const BecomeaSupplier = () => {
  return (
    <section className="h-[300px] mt-2 bg-[#737373] flex flex-col text-center justify-center items-center">
  <h2 className="text-white text-2xl font-semibold pb-3">
    Experience Caribbean Taste
  </h2>

  <div className="flex flex-col space-y-1">
    <a href="/shop" className="inline-block">
      <button
        className="bg-[#f68b1f] font-black tracking-widest transform scale-100 transition-transform transition-colors duration-200 ease-in-out hover:scale-115 hover:bg-black text-white px-6 py-3"
        type="button"
      >
        Shop Now
      </button>
    </a>

    <p className="text-white font-black">or</p>

    <a href="/become-a-supplier" className="inline-block">
      <button
        className="bg-[#f68b1f] font-black tracking-widest transform scale-100 transition-transform transition-colors duration-200 ease-in-out hover:scale-115 hover:bg-black text-white px-6 py-3"
        type="button"
      >
        Become a Supplier
      </button>
    </a>
  </div>
</section>

  );
}

export default BecomeaSupplier;