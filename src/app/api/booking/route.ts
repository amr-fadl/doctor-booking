import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../libs/db/dbConnect";
import Booking from "../../../libs/db/models/Booking";
import Availabletime from "../../../libs/db/models/Availabletime";

// (Create)
export async function POST(request: NextRequest) {
    try {

        // connect mongoose
        await dbConnect();

        // get data from request
        const data = await request.formData();

        const name: any = data.get('name');
        const email: any = data.get('email');
        const datetime: any = data.get('datetime');

        // check all fields is required
        if (!name || !email || !datetime) return NextResponse.json({ success: false, message: 'name, email, datetime is required' });

        // create new booking
        await Availabletime.findOneAndUpdate({ datetime: new Date(datetime) }, { status: 'booked' });
        await Booking.create({ name, email, datetime: new Date(datetime) });
        const availabletime = await Availabletime.find({ status: 'available' });

        // Response
        return NextResponse.json({
            availabletime: availabletime,
            message: `Booking is created`,
            success: true,
            status: 200,
            statusText: 'Ok'
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false });
    }

}

// (Reed)
export async function GET() {

    try {

        // Connect mongoose
        await dbConnect();

        // get data
        const bookings = await Booking.find({})

        // response
        return NextResponse.json({ bookings, message: "get bookings successfuly", success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false });
    }

}