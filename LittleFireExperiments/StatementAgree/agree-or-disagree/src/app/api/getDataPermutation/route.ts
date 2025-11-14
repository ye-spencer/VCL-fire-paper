import { NextResponse } from "next/server";

export async function GET() 
{
    const order : string[] = [
        "Humans like to look at fire",
        "Animals like to look at fire",
        "Humans are afraid of a big fire",
        "Animals are afraid of a big fire",
        "Humans feel that a small or medium fire is pretty",
        "Animals feel that a small or medium fire is pretty",
        "Humans like the warmth of a medium fire",
        "Animals like the warmth of a medium fire",
        "Humans like to cook on a fire",
        "Animals like to cook on a fire",
        "Humans can make a fire",
        "Animals can make a fire",
    ];

    // Fisher-Yates shuffle algorithm
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }


    const response = NextResponse.json(
        {
            order : order,
        }
    );
    return response;
}   