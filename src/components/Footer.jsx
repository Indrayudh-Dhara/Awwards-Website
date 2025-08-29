import React from 'react'
import { FaGithub , FaLinkedin  } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const links = [
    {href : 'https://www.linkedin.com/in/indrayudh-dhara/' , icon:<FaLinkedin/>},
    {href : 'https://x.com/IndrayudhDhara' , icon:<FaSquareXTwitter/>},
    {href : 'https://github.com/Indrayudh-Dhara' , icon:<FaGithub/>}
]

const Footer = () => {
  return (
    <footer className="w-screen bg-violet-300 py-4 px-6 text-black">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
            <p className="text-center text-sm md:text-left">
                &copy; Built by Indrayudh Dhara
            </p>

            <div className="flex justify-center gap-4 md:justify-start">
                {links.map((link)=>(
                    <a key={link} href={link.href} target="_blank" rel="noopener noreferrer" className="text-black transition-colors duration-500 ease-in-out hover:text-white">{link.icon} </a>
                ))}
            </div>
            <a href="#privacy-policy" className="text-center text-sm hover:underline md:text-right">Inspiration @JavaScriptMastery</a>
        </div>

    </footer>
  )
}

export default Footer