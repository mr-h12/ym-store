import type { GarmentShape } from "@/lib/types";

/**
 * Shows the real product photo when one exists; otherwise a flat,
 * illustrated garment silhouette in the product colour. The silhouettes
 * are placeholders until the store's own photos are added to /public/products.
 */
const PATHS: Record<GarmentShape, string> = {
  tee: "M70 40 L100 28 Q120 44 140 28 L170 40 L196 78 L170 92 L164 82 L164 196 L76 196 L76 82 L70 92 L44 78 Z",
  shirt: "M72 38 L104 26 L120 50 L136 26 L168 38 L196 120 L176 126 L164 84 L164 200 L76 200 L76 84 L64 126 L44 120 Z M120 50 L120 200",
  knit: "M68 42 L100 30 Q120 42 140 30 L172 42 L192 160 L172 164 L162 92 L164 196 L76 196 L78 92 L68 164 L48 160 Z",
  trouser: "M80 26 L160 26 L170 204 L132 204 L120 82 L108 204 L70 204 Z",
  jacket: "M70 36 L102 24 L120 60 L138 24 L170 36 L198 150 L176 156 L164 90 L166 206 L74 206 L76 90 L64 156 L42 150 Z M120 60 L120 206",
  dress: "M96 24 L144 24 L146 64 Q140 80 150 96 L186 206 L54 206 L90 96 Q100 80 94 64 Z",
};

export function ProductImage({
  shape,
  colour,
  name,
  src,
  className = "",
  priority = false,
}: {
  shape: GarmentShape;
  colour: string;
  name: string;
  src?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={name}
      className={`flex h-full w-full items-center justify-center bg-surface-2 ${className}`}
    >
      <svg viewBox="0 0 240 230" className="h-[78%] w-[78%]" aria-hidden="true">
        <path
          d={PATHS[shape]}
          fill={colour}
          stroke="rgb(0 0 0 / 0.18)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
