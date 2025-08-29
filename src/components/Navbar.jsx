import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import {useWindowScroll} from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus' , 'Vault' , 'Prologue' , 'About', 'Contact'];

const Navbar = () => {
    const [isAudioPlaying , setIsAudioPlaying] = useState(false);
    const [isIndicatorActive , setIsIndicatorActive] = useState(false);
    const navContainerRef =  useRef(null);
    const audioElementRef = useRef(null);
    const [lastScrollY , setLastScrollY] = useState(0);
    const [isNavVisible , setIsNavVisible] = useState(true);

    const {y:currentScrollY} = useWindowScroll();

    // handle nav hide/show on scroll
    useEffect(()=>{
        if(currentScrollY === 0){
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }else if(currentScrollY>lastScrollY){ //scrolling down
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        }else if(currentScrollY<lastScrollY){
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY , lastScrollY]);

    useEffect(()=>{
        gsap.to(navContainerRef.current , {
            y : isNavVisible ? 0 : -100,
            opacity : isNavVisible ? 1 : 0,
            duration : 0.2
        })
    },[isNavVisible]);

    const toggleAudioIndicator = () =>{
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    // play/pause based on state
    useEffect(()=>{
        if(isAudioPlaying){
            audioElementRef.current.play().catch(err => {
                console.log("Autoplay blocked:", err);
            });
        }else{
            audioElementRef.current.pause();
        }
    },[isAudioPlaying]);

    // 🔓 start audio on first real user interaction (click/tap/keydown)
    useEffect(() => {
        const unlock = () => {
            if (!audioElementRef.current) return;
            audioElementRef.current.muted = false;
            audioElementRef.current.play().then(() => {
                setIsAudioPlaying(true);
                setIsIndicatorActive(true);
            }).catch(err => {
                console.log("Play failed:", err);
            });
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
        };
        window.addEventListener('pointerdown', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
        return () => {
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('keydown', unlock);
        };
    }, []);

    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="Logo" className="w-10" />
                        <Button 
                          id="product-button" 
                          title="Products" 
                          rightIcon={<TiLocationArrow/>} 
                          containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                        {navItems.map((item)=>(
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                              {item}
                            </a>
                        ))}
                        </div>
                        <button 
                          className="ml-10 flex items-center space-x-0.5 cursor-pointer" 
                          onClick={toggleAudioIndicator}
                        >
                            <audio ref={audioElementRef} src="/audio/loop.mp3" loop className="hidden"/>
                            {[1,2,3,4].map((bar)=>(
                                <div 
                                  key={bar} 
                                  className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} 
                                  style={{animationDelay: `${bar*0.1}s`}}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
