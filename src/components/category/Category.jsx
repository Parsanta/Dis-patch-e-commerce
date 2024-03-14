import React, { useRef, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
const category = [
    {
        image: 'https://icons.veryicon.com/png/o/miscellaneous/home-of-wisdom-shopping/jewelry-5.png',
        name: 'jewelry'
    },
    {
        image: 'https://uxwing.com/wp-content/themes/uxwing/download/beauty-fashion/makeup-icon.png',
        name: 'makeup'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-smartphone-android-mobile-device-44503.png?f=webp&w=256',
        name: 'mobile'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-tote-bag-3695114-3076619.png?f=webp&w=256',
        name: 'bags'
    },
    {
        image: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/laptop-2840239-2359373.png?f=webp&w=256',
        name: 'laptop'
    },
    {
        image: 'https://uxwing.com/wp-content/themes/uxwing/download/fitness-gym-yoga-spa/shoe-running-icon.png',
        name: 'shoes'
    },
    {
        image: 'https://uxwing.com/wp-content/themes/uxwing/download/household-and-furniture/dresser-furniture-icon.png',
        name: 'home'
    },
    {
        image: 'https://icons.veryicon.com/png/o/miscellaneous/home-of-wisdom-shopping/jewelry-5.png',
        name: 'jewelry'
    },
    {
        image: 'https://uxwing.com/wp-content/themes/uxwing/download/beauty-fashion/makeup-icon.png',
        name: 'makeUp'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-smartphone-android-mobile-device-44503.png?f=webp&w=256',
        name: 'mobile'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-tote-bag-3695114-3076619.png?f=webp&w=256',
        name: 'bags'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-book-2757242-2293194.png?f=webp&w=256',
        name: 'shoes'
    },
    {
        image: 'https://uxwing.com/wp-content/themes/uxwing/download/beauty-fashion/makeup-icon.png',
        name: 'makeup'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-smartphone-android-mobile-device-44503.png?f=webp&w=256',
        name: 'mobile'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-tote-bag-3695114-3076619.png?f=webp&w=256',
        name: 'bags'
    },
    {
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-book-2757242-2293194.png?f=webp&w=256',
        name: 'books'
    }
]

const Category = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        let scrollAmount = 1;

        const scroll = () => {
            if (!isDragging) {
                container.scrollLeft += scrollAmount;
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    scrollAmount = -1; // Change direction when reaching the end
                } else if (container.scrollLeft <= 0) {
                    scrollAmount = 1; // Change direction when reaching the beginning
                }
            }
        };

        const intervalId = setInterval(scroll, 50);

        return () => {
            clearInterval(intervalId);
        };
    }, [isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) *5; // Adjust the sensitivity here
        containerRef.current.scrollLeft -= walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="px-5">
            <div className="flex flex-col mt-5">
                <div
                    className="flex overflow-x-scroll hide-scroll-bar"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}>
                    {category.map((item, index) => (
                        <div key={index} className="px-3 lg:px-4">
                            <div
                                onClick={() => navigate(`/category/${item.name.toLowerCase()}`)}
                                className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs transition-transform cursor-pointer mb-1 transform hover:scale-105 rounded-lg overflow-hidden shadow-md ">
                                <div className="flex justify-center">
                                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                </div>
                            </div>
                            <h1 className="text-xs lg:text-sm text-center font-medium title-font mt-2">{item.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .hide-scroll-bar::-webkit-scrollbar {
                        display: none;
                    }
                `
            }} />
        </div>
    );
};

export default Category;