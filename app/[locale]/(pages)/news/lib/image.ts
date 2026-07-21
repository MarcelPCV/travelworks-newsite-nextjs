function toBase64(value: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(value).toString('base64');
  }

  return window.btoa(value);
}

function shimmer(width: number, height: number): string {
  return `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#f0f4f8" offset="20%" /><stop stop-color="#e2e8f0" offset="50%" /><stop stop-color="#f0f4f8" offset="70%" /></linearGradient></defs><rect width="${width}" height="${height}" fill="#f0f4f8" /><rect id="r" width="${width}" height="${height}" fill="url(#g)" /><animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  /></svg>`;
}

export function getBlurDataURL(width = 1200, height = 675): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
}
