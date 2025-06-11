const OurStory = () => {
  return (
    <div className="flex w-full h-[300px] sm:h-[400px] md:h-[500px] mx-auto">
      {/* Left Half */}
      <div className="w-1/2 p-4 flex flex-col justify-center">
        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-left">
            Our Story
          </h2>
        </div>

        {/* Paragraph */}
        <div>
          <p className="text-[10px] sm:text-base md:text-lg text-left leading-snug sm:leading-normal">
            “Born from a fisherman’s boat and a farmer’s field, we started by
            hand-delivering Dominica’s freshest harvests and catch to neighbors.
            Today, we’re your direct link to the island’s vibrant flavors—and
            the hardworking hands that bring them to life.”
          </p>
        </div>
      </div>

      {/* Right Half */}
      <div
        className="w-1/2 bg-cover bg-center grayscale"
        style={{ backgroundImage: "url('/images/Section5/Image1.png')" }}
      />
    </div>
  )
}

export default OurStory
