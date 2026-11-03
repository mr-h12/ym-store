/** Native <details> disclosure, styled. Works without JS. */
export function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line">
      <summary className="tap flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>
      <div className="settle pb-5 text-sm leading-relaxed text-ink/85">{children}</div>
    </details>
  );
}
