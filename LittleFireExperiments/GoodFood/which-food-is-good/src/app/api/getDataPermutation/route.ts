import { NextResponse } from "next/server";

export async function GET() 
{
    let cookedOrder : string[] = [];
    const randOne = Math.random();
    if (randOne < 0.5)
    {
        cookedOrder = ["Cooked", "Raw"];
    }
    else
    {
        cookedOrder = ["Raw", "Cooked"];
    }

    let foodType : string = "";
    const randTwo = Math.random();
    if (randTwo < 0.5)
    {
        foodType = "Meat";
    }
    else
    {
        foodType = "Vegetables";
    }


    const response = NextResponse.json(
        {
            cookedOrder : cookedOrder,
            foodType : foodType
        }
    );
    return response;
}   