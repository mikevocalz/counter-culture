'use client'

import { useCallback, useState } from 'react'

interface UseCarouselOptions {
  totalSlides: number
  initialSlide?: number
}

export function useCarousel({ totalSlides, initialSlide = 0 }: UseCarouselOptions) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide)

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlide(index)
      }
    },
    [totalSlides]
  )

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  return { currentSlide, goToSlide, nextSlide, prevSlide }
}
