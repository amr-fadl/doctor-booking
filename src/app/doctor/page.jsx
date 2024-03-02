"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import LoadingForm from "../../components/LoadingForm";
import base_url from '../../libs/base_url'

import { Form, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


export default function page() {

    const router = useRouter();

    // get datetimes
    const [datetimes, setDatetimes] = useState({})
    const [booked, setBooked] = useState({})
    useEffect(() => {
        (async () => {
            const all = await base_url.get('/api/availabletime')
            setDatetimes(all.data.availabletime.map((item) => item))

            const booking = await base_url.get('/api/booking')
            setBooked(booking.data.bookings.map((item) => item))
        })()
    }, [])

    const onSubmit = async (formData) => {
        try {
            const response = await base_url.post("/api/availabletime", formData);
            if (response.data.success) {
                setDatetimes(response.data.availabletime)
                toast.success("datetime add success");
                router.refresh()
            } else {
                toast.error('datetime failed ' + response.data.message);
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
                        <h1>Add datetime</h1>
                        <Form action={onSubmit} className="position-relative p-3 mb-5" style={{ minWidth: '400px' }}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <input type="datetime-local" name="datetime" className="p-2 w-100 rounded" />
                            </Form.Group>
                            <Button variant="success" type="submit" className="m-auto d-block">Add New</Button>
                            <LoadingForm />
                        </Form>
                        <Tabs
                            defaultActiveKey="All Date"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="All Date" title="All Date">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date And Time</th>
                                            <th>status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datetimes.length > 0 && datetimes.map((item, i) => (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td>{item.datetime}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="Booking" title="Booking">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>name</th>
                                            <th>email</th>
                                            <th>Date And Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booked.length > 0 && booked.map((item, i) => (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.datetime}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Tab>
                        </Tabs>

                    </div>
                </div>
            </div>
        </section>
    );
}
