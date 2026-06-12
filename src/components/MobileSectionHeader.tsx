export default function MobileSectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="block lg:hidden mb-12 border-l-2 border-accent/40 pl-4 py-1">
      <span className="text-xs font-mono text-muted-light tracking-widest uppercase block mb-1">
        {subtitle}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}
