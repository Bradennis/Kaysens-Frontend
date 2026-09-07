export function Container({ children, className = "" }) {
  return <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-forest mt-3 tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-forest/60 text-pretty leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, image }) {
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      {image && (
        <div className="absolute inset-0 opacity-30">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/70 to-forest/30" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-semibold mt-4 max-w-3xl tracking-tight text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-cream/70 text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
