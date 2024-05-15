


import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

                    <p className="ml-2 mt-2 items-center text-center logo font-extrabold  text-4xl">
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
            <div className="grid place-content-center">
                <Link href="/" className='flex flex-row text-center items-center'> 
                    <Image
                        src="/assets/brand/quick.png"
                        width={100}
                        height={100}
                        alt="Rapid AI Logo"
                        className="w-12 h-12"
                        />

                    <p className="ml-2 mt-1.5 items-center text-center logo font-extrabold  text-xl">
                    Rapid AI
                    </p>
                </Link>
            </div>
        </>
    );
}