import React, { useState, useEffect } from "react";
import "./Slider.css";
import im1 from './1.jpg';
import im2 from './2.jpg';
import im3 from './3.jpg';
import im4 from './4.jpg';
import im5 from './5.jpg';

const ImageSlider = () => {
    const slides = [
        { url: im1, title: "Title" },
        { url: im2, title: "Title" },
        { url: im3, title: "Title" },
        { url: im4, title: "Title" },
        { url: im5, title: "Title" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(goToNext, 5000);
        return () => clearInterval(intervalId);
    }, [currentIndex, goToNext]);

    return (
        <div className="slider">
            <div>
                <div onClick={goToPrevious} className="left-arrow">
                    ❰
                </div>
                <div onClick={goToNext} className="right-arrow">
                    ❱
                </div>
            </div>
            <img src={slides[currentIndex].url} className="slide" alt="Slider" />
        </div>
    );
};

export default ImageSlider;
