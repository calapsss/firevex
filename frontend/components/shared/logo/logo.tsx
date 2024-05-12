


import Link from 'next/link';
import React from 'react';

export default function Logo() {
    return(
        <>
            <div>
                <Link href="/">                
                    <p className="logo font-extrabold text-2xl">
                    Rapid AI
                    </p>
                </Link>
            </div>
        </>
    );
}