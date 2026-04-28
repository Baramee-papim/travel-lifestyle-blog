import heroPicture from "@/assets/hero-picture.png";

const HeroSection = () => {
  return (
    <section className="bg-brown-100 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Vertical Stack | Desktop: 3 Columns */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:items-center">
          {/* Top - Text Block (Mobile) | Left (Desktop) */}
          <div className="order-1 lg:order-1">
            <h1 className="text-headline-2 text-brown-600 mb-6 text-center">
              Stay Informed,<br />
              Stay Inspired
            </h1>
            <p className="text-body-1 text-brown-400 text-center">
              Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
            </p>
          </div>

          {/* Middle - Image Card (Mobile) | Center (Desktop) */}
          <div className="order-2 lg:order-2">
            <div className="rounded-lg overflow-hidden">
              <img
                src={heroPicture}
                alt="Person with cat in outdoor setting"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Bottom - Author Section (Mobile) | Right (Desktop) */}
          <div className="order-3 lg:order-3">
            <p className="text-body-3 text-brown-400 mb-2">-Author</p>
            <h2 className="text-headline-3 text-brown-500 mb-4">Thompson P.</h2>
            <p className="text-body-1 text-brown-400 mb-4">
              I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
            </p>
            <p className="text-body-1 text-brown-400">
              When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
