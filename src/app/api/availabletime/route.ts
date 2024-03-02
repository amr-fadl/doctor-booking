import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../libs/db/dbConnect";
import Availabletime from "../../../libs/db/models/Availabletime";

// (Create)
export async function POST(request: NextRequest) {
    try {

        // connect mongoose
        await dbConnect();

        // // get data from request
        const data = await request.formData();

        const datetime: any = data.get('datetime');
        const status: any = data.get('status');

        // // check all fields is required
        if (!datetime) return NextResponse.json({ success: false });

        // // // create new booking
        await Availabletime.create({ 'datetime': new Date(datetime), status: status ?? 'available' });
        const all = await Availabletime.find({});

        // Response
        return NextResponse.json({
            availabletime: all,
            message: `datetime is created`,
            success: true,
            status: 200,
            statusText: 'Ok'
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false });
    }

}

// (Reed)
export async function GET(request: NextRequest) {

    try {

        // Connect mongoose
        await dbConnect();

        // get data
        const availabletime = await Availabletime.find({})

        // response
        return NextResponse.json({ availabletime, message: "get bookings successfuly", success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false });
    }

}