import React from "react";

export default function DotNav({ count, activeIndex, onSelect }) {
  const items = Array.from({ length: count });
  return (
    <div className="dot-nav" aria-hidden="false">
      {items.map((_, i) => (
        <button
          key={i}
          className={`dot-btn${i === activeIndex ? " active" : ""}`}
          onClick={() => onSelect(i)}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  );
}
