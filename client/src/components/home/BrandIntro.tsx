import { AnimatedContainer } from '@/components/ui/animated-container';

export default function BrandIntro() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Gir Cows",
      description: "Our products come from pure Gir cow breeds, maintained with love and care in their natural environment."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Traditional Methods",
      description: "We follow ancient Vedic practices combined with modern standards to create pure and authentic products."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[hsl(142,43%,35%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Ethical & Sustainable",
      description: "Our cows are treated with utmost respect and care, ensuring both their well-being and the quality of our products."
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedContainer className="max-w-3xl mx-auto text-center mb-16" type="fade">
          <span className="font-accent text-[hsl(16,85%,55%)] text-xl">Our Heritage</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(142,43%,35%)] mt-2 mb-6">
            Pure Products from Sacred Cows
          </h2>
          <p className="text-[hsl(120,10%,10%)] text-lg">
            At Sasyamrta, we honor the ancient wisdom of cow-based products while embracing modern quality standards. From pure A2 milk to ayurvedic preparations, each product carries the blessing of our sacred cows and the power of traditional knowledge.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <AnimatedContainer
              key={index}
              className="bg-[hsl(195,47%,97%)] rounded-xl p-8 shadow-sm transition-transform hover:-translate-y-1 duration-300"
              type="fade"
              delay={0.1 * (index + 1)}
            >
              <div className="w-14 h-14 bg-[hsl(142,43%,35%)]/10 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-[hsl(142,43%,35%)] mb-3">{feature.title}</h3>
              <p className="text-[hsl(120,10%,10%)]">{feature.description}</p>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
