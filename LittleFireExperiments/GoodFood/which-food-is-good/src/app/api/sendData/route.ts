import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { whichFoodIsGood } from "@/drizzle/schema";

export async function POST(req: Request) 
{
    const body = await req.json();

    const result = await db.insert(whichFoodIsGood).values({
        startTime: 0,
        endTime: body.endTime - body.startTime,
        selected: body.selected,
        foodType: body.foodType,
        firstCooked: body.firstCooked,
        secondCooked: body.secondCooked,
        prolificId: body.prolificId,
        studyId: body.studyId,
        sessionId: body.sessionId
    });

    const response = NextResponse.json(
        {
            message: "Hit sendData route",
            result: result
        }
    );
    return response;
}   