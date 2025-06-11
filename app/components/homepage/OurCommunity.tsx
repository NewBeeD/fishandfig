const Community = () => {
  return (
    <div className="flex flex-row-reverse w-full h-[300px] sm:h-[400px] mx-auto">
      {/* Left Half */}
      <div className="w-1/2 p-4 flex flex-col justify-center">
        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-left">
            Community
          </h2>
        </div>

        {/* Description */}
        <div>
          <p className="text-[10px] sm:text-base md:text-lg text-left leading-snug sm:leading-normal">
            We’re more than a marketplace—we’re a movement. Every order supports Dominican farmers and fishers, preserves traditional agriculture, and helps build sustainable food systems for future generations. Together, we’re growing stronger communities, one harvest at a time.
          </p>
        </div>
      </div>

      {/* Right Half (Image) */}
      <div
        className="w-1/2 h-full bg-cover bg-center grayscale"
        style={{ backgroundImage: "url('/images/Section5/Image2.png')" }}
      />
    </div>
  )
}

export default Community;
