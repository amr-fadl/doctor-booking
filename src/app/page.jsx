"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import LoadingForm from "../components/LoadingForm";
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import base_url from '../libs/base_url'


export default function Home() {

  const router = useRouter();
  const formRef = useRef(null);

  // get datetimes
  const [datetimes, setDatetimes] = useState({})
  useEffect(() => {
    (async () => {
      const res = await base_url.get('/api/booking/notbooked')
      setDatetimes(res.data.availabletime.map((item) => item))
    })()
  }, [])

  const onSubmit = async (formData) => {
    try {
      const response = await base_url.post("/api/booking", formData);
      if (response.data.success) {
        setDatetimes(response.data.availabletime)
        toast.success("booking add success");
        formRef.current.reset();
        router.refresh()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center" style={{ minHeight: '70vh' }}>
          <div className="col-lg-8 d-flex justify-content-center align-items-center flex-column">
            <h1>Booking appointment</h1>
            <Form ref={formRef} action={onSubmit} className="position-relative p-3 mb-5" style={{ minWidth: '400px' }}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control type="text" name="name" placeholder="Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" name="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select name="datetime" defaultValue='Choose'>
                  <option value='Choose' disabled>Choose Date And Time</option>
                  {
                    datetimes.length > 0 && (datetimes.map((item, i) => <option key={i} value={item.datetime}>{item.datetime}</option>))
                  }
                </Form.Select>
              </Form.Group>
              <Button variant="success" type="submit" className="m-auto d-block">Booking</Button>
              <LoadingForm />
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
