import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/db/dbConnect";
import Availabletime from "../../../../libs/db/models/Availabletime";

// (Reed)
export async function GET() {

    try {

        // Connect mongoose
        await dbConnect();

        // get data
        const availabletime = await Availabletime.find({ status: 'available' })

        // response
        return NextResponse.json({ availabletime, message: "get availabletime successfuly", success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false });
    }

}