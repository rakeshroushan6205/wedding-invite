export default function EventPhoto({ src, alt }) {
  return (
    <div className="relative overflow-hidden border-b border-gold/25 bg-maroon/5">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon/20 via-transparent to-transparent opacity-70"
        aria-hidden="true"
      />
    </div>
  )
}
