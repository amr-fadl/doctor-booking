import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='py-3'>
            <div className="container">
                <div className="row">
                    <div className="col d-flex gap-3">
                        <Link href='/' className='btn btn-primary'>Patient</Link>
                        <Link href='/doctor' className='btn btn-primary'>Doctor</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar