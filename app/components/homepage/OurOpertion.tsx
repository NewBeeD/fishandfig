'use client'

import { useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const OurOperation = () => {
  const slides = [
    {
      title: 'Suppliers',
      image: '/Body/Section3/Image1.png',
      description: 'Trusted local farmers & fishermen committed to sustainability. Fresh, ethically sourced seafood and produce, always top-quality.',
    },
    {
      title: 'Handling',
      image: '/Body/Section3/Image2.png',
      description: 'Inspected, cleaned, and stored in temperature-controlled environments—preserving freshness and safety from harvest to delivery.',
    },
    {
      title: 'Packaging',
      image: '/Body/Section3/Image3.png',
      description: 'Eco-friendly, insulated packaging with ice packs or vacuum-sealing. Delivered fast—farm-to-fork or ocean-to-table, never frozen!',
    },
  ]

  const sliderRef = useRef<Slider>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <ul className="absolute bottom-4 sm:bottom-6 flex items-center justify-center w-full p-0 m-0 list-none">
        {dots}
      </ul>
    ),
    customPaging: (i: number) => (
      <div
        className={`
          w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full
          mx-1 cursor-pointer
          transition-colors duration-300
          ${currentSlide === i ? 'bg-primary' : 'bg-gray-500'}
        `}
      />
    ),
  }

  return (
    <div className="w-full max-w-full sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1440px] mx-auto relative px-2 sm:px-3">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[300px] sm:h-[400px] md:h-[500px]">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-6 sm:px-12 w-[90%] sm:w-4/5 md:w-7/10 text-center flex flex-col gap-2 sm:gap-4">
              <h3 className="text-white font-extrabold text-[1.75rem] sm:text-2xl md:text-[2.5rem] mb-4 sm:mb-6">
                {slide.title}
              </h3>
              <p className="text-white text-base sm:text-lg md:text-xl leading-tight sm:leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center gap-1 sm:gap-2 mt-1 sm:mt-2 px-2 sm:px-0">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            role="button"
            tabIndex={0}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                sliderRef.current?.slickGoTo(index)
              }
            }}
            className={`rounded overflow-hidden cursor-pointer transition-all duration-300 ${
              currentSlide === index ? 'opacity-100 border-2 border-primary' : 'opacity-70 border border-gray-300'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurOperation
