import heroBanner from "@/assets/hero-banner.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Animated background image */}
      <div className="absolute inset-0 animate-hero-zoom">
        <img
          src={heroBanner}
          alt="Luxury fashion collection featuring shoes, watches, and glasses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-up text-gold-gradient"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          REVE ESSENCE
        </h1>
        <p
          className="mt-4 font-body text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          Luxury Redefined
        </p>
        <a
          href="#shoes"
          className="mt-10 px-8 py-3 border border-foreground/30 text-foreground font-body text-sm uppercase tracking-widest hover:bg-foreground/10 transition-all duration-300 animate-fade-up"
          style={{ animationDelay: "0.9s", animationFillMode: "both" }}
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
}
