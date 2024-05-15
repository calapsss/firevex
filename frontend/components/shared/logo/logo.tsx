


import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ["800"] })

export default function Logo() {
    return(
        <>
            <div className="grid place-content-center">
                <Link href="/" className='flex flex-row text-center items-center'> 
                    <Image
                        src="/assets/brand/quick.png"
                        width={100}
                        height={100}
                        alt="Rapid AI Logo"
                        className="w-16 h-16"
                    />

                    <p className={`ml-2 mt-2 items-center text-center logo font-extrabold  text-4xl ${poppins.className}`}>
                        Rapid AI
                    </p>
                </Link>
            </div>
        </>
    );
}

export function LogoDash() {
    return(
        <>
                <Link href="/" className='flex flex-row text-center items-center'> 
                    <Image
                        src="/assets/brand/quick.png"
                        width={100}
                        height={100}
                        alt="Rapid AI Logo"
                        className="w-10 h-10"
                        />

                    <p className={`ml-2 mt-1 items-center text-center logo font-extrabold  text-xl ${poppins.className}`}>
                    Rapid AI
                    </p>
                </Link>
          
        </>
    );
}