/**
 * Utility to optimize Cloudinary and other web image URLs dynamically.
 * Adds f_auto, q_auto, w_X parameters to Cloudinary URLs for fast delivery (AVIF/WebP, optimal compression, proper width).
 */
export function optimizeImage(url: string | undefined, width = 1200): string {
  if (!url) return '';
  
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Check if already transformed
    if (!url.includes('/upload/f_auto') && !url.includes('/upload/q_auto')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
    }
  }
  return url;
}

/**
 * Compresses an image file (e.g. from file input) before converting to base64 DataURL
 * to avoid exceeding browser localStorage 5MB quota.
 */
export async function compressImageFile(file: File, maxDimension = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to webp if supported, otherwise jpeg
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (e) {
          resolve(reader.result as string);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

