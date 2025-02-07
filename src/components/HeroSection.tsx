const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 grid grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">
            Инновационные решения для электротехники
          </h1>
          <p className="text-xl mb-8">
            Разработка и производство современного измерительного оборудования
          </p>
          <div className="flex gap-4">
            <PrimaryButton>Каталог продукции</PrimaryButton>
            <SecondaryButton>Получить консультацию</SecondaryButton>
          </div>
        </div>
        <div className="relative">
          <Image 
            src="/hero-image.webp"
            alt="Современное оборудование АВЭМ"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  )
} 