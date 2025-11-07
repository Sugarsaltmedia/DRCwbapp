import React, { useState, useRef, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  onError?: () => void;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  onError,
  onLoad,
  loading = 'lazy',
  priority = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(!loading || loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before the image comes into view
          threshold: 0.1
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [loading]);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Skeleton loader */}
      {!imageLoaded && !imageError && (
        <div className={`absolute inset-0 skeleton rounded-2xl ${className}`} />
      )}
      
      {/* Actual image */}
      {isInView && !imageError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          style={{
            backgroundColor: '#262626',
            minHeight: '100%',
            minWidth: '100%'
          }}
        />
      )}
      
      {/* Fallback */}
      {imageError && (
        <div className={`${fallbackClassName || className} bg-neutral-800 rounded-2xl flex items-center justify-center`}>
          <span className="text-neutral-500 text-xs">No Image</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;