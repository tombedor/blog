import React, {useState} from 'react';

type Screenshot = {
  src: string;
  alt: string;
};

type ScreenshotCarouselProps = {
  images: Screenshot[];
};

export default function ScreenshotCarousel({images}: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  if (!currentImage) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <figure className="screenshot-carousel">
      <div className="screenshot-carousel__frame">
        <button
          type="button"
          className="screenshot-carousel__button screenshot-carousel__button--previous"
          onClick={goToPrevious}
          aria-label="Previous screenshot">
          ‹
        </button>
        <a href={currentImage.src}>
          <img src={currentImage.src} alt={currentImage.alt} />
        </a>
        <button
          type="button"
          className="screenshot-carousel__button screenshot-carousel__button--next"
          onClick={goToNext}
          aria-label="Next screenshot">
          ›
        </button>
      </div>
      <figcaption className="screenshot-carousel__caption">
        {currentIndex + 1} / {images.length}
      </figcaption>
    </figure>
  );
}
