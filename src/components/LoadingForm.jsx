"use client"
import { Spinner } from 'react-bootstrap'
import { useFormStatus } from 'react-dom'

const LoadingForm = ({ text = "Loading" }) => {

  const { pending } = useFormStatus()

  return (
    <div role="status" className={`position-absolute top-0 left-0 w-100 h-100 align-items-center justify-content-center ${!pending ? "d-none" : "d-flex"}`}>
      <div className="bg-info rounded position-absolute top-0 left-0 w-100 h-100 opacity-50"></div>
      <Spinner animation="border" role="status" className='position-relative'>
        <span className="visually-hidden">{text}...</span>
      </Spinner>
    </div>
  )

}

export default LoadingForm
