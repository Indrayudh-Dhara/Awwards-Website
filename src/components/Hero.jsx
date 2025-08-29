import React, {  useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP  } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    //to keep track of which video is playing or to be played
    const [currentIndex , setCurrentIndex] = useState(1);
    //to keep track of user clicking on the video
    const [hasClicked , setHasClicked] = useState(false);
    const [isLoading , setIsLoading] = useState(true);
    //a state for the no of videos loaded till now 
    const [loadedVideos , setLoadedVideos] = useState(0);
    //defining total no of videos to be played max
    const totalVideos = 4;
    //
    const nextVideoRef = useRef(null);

    const handleVideoLoad=()=>{
        setLoadedVideos((prev)=>prev+1);
    }

    const upcomingVideoIndex = (currentIndex%totalVideos) + 1;//to avoid breaking after index 3(totalvideos) and instead start over . 
    // to handle the video click effect
    const handleMiniVdClick =() =>{
         setHasClicked(true);
         setCurrentIndex(upcomingVideoIndex);
    }

    useEffect(()=>{
        if(loadedVideos === totalVideos-1){
            setIsLoading(false);
        }
    }, [loadedVideos])

    
    useGSAP(()=>{
        if(hasClicked){
            gsap.set('#next-video' , {visibility:'visible'});
            gsap.to('#next-video' , {
                transformOrigin :'center center',
                scale : 1,
                width : '100%',
                height : '100%',
                duration : 1,
                ease : 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
            } )

            gsap.from('#current-video', {
                transformOrigin : 'center center',
                scale:1,
                duration:1.5,
                ease : 'power1.inOut',

            })

        }
    } , {dependencies : [currentIndex] , revertOnUpdate:true});

    useGSAP(()=>{
        
        gsap.set('#video-frame' , {
            clipPath : 'polygon(14% 0%, 72% 0%, 88% 90%, 0% 95%)', //from css clip path maker (to make an image take diff shape)
            borderRadius : '0% 0% 40% 10%'
        })
        gsap.from('#video-frame' , {
            clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', //from css clip path maker (to make an image take diff shape)
            borderRadius : '0% 0% 0% 0%',
            ease : 'power1.inOut',
            scrollTrigger: {
                trigger : '#video-frame',
                start : 'center center',
                end : 'bottom center',
                scrub: true,
            }
        })
    })

    useGSAP(() => {
  // whenever the mini box video changes
  gsap.from("#current-video", {
    scale: 1,
    opacity: 0,
    duration: 1,
    ease : 'power1.inOut', // nice pop-in
  });
}, { dependencies: [upcomingVideoIndex], revertOnUpdate: true });




    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        {isLoading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50 ">
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>

                </div>
            </div>
        )}
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg lg-blue-75'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg group'>
                    <div onClick={handleMiniVdClick} className='origin-center scale-30 opacity-0 transition-all duration-500 ease-in group-hover:scale-100 group-hover:opacity-100'>
                        <video loop muted   playsInline
  webkit-playsinline="true" id='current-video'  ref={nextVideoRef} src={getVideoSrc(upcomingVideoIndex)} onLoadedData={handleVideoLoad} className='size-64 origin-center scale-150 object-cover object-center'/>
                    </div>
                </div>
                <video loop muted   playsInline
  webkit-playsinline="true" id='next-video' className='absolute-center invisible absolute z-20 size-64 object-cover object-center' ref={nextVideoRef} src={getVideoSrc(currentIndex)} onLoadedData={handleVideoLoad}/>
                <video src={getVideoSrc(currentIndex === totalVideos-1 ? 1:currentIndex)} autoPlay loop muted   playsInline
  webkit-playsinline="true" className='absolute left-0 top-0 size-full object-cover object-center' onLoadedData={handleVideoLoad}/>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>
            <div className='absolute left-0 top-0 z-40 size-full'>
                <div className='mt-24 px-5 sm:px-10'>
                    <h1 className='special-font hero-heading text-blue-75'>
                        redefi<b>n</b>e
                    </h1>
                <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                    Enter the Metagame Layer <br /> Unleash the Play Economy
                </p>
                <Button id="watch-trailer"title="Watch Trailer" leftIcon={<TiLocationArrow/>}  containerClass="bg-yellow-300 flex-center gap-1"/>
                </div>

            </div>
        </div>
         <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>G<b>a</b>ming</h1>

    </div>
  )
}

export default Hero