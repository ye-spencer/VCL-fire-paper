import { NextResponse } from "next/server";

export async function GET()
{
    // return NextResponse.json({
    //     one : "Not Like Fire",
    //     two : "Like Fire"
    // });
    const trial_type = Math.random();



    let word_one = "";
    let word_two = "";


    if (trial_type <= 0.5)
    {
        word_one = "Less Good for Safe Signal";
        word_two = "More Good for Safe Signal";
    }
    else
    {
        word_one = "Less Good for Background";
        word_two = "More Good for Background";
    }

    // if (trial_type <= 0.5)
    // {
    //     word_one = "Less Good for Danger Signal";
    //     word_two = "More Good for Danger Signal";
    // }
    // else
    // {
    //     word_one = "Less Pretty Stone";
    //     word_two = "More Pretty Stone";
    // }
    
    // if (trial_type <= 0.25)
    // {
    //     word_one = "Pretty";
    //     word_two = "Ugly";
    // }
    // else if (trial_type <= 0.5)
    // {
    //     word_one = "Ugly";
    //     word_two = "Pretty";
    // }
    // else if (trial_type <= 0.75)
    // {
    //     word_one = "Safe";
    //     word_two = "Dangerous";
    // }
    // else
    // {
    //     word_one = "Dangerous";
    //     word_two = "Safe";
    // }

    
    return NextResponse.json({
        one : word_one,
        two : word_two
    });
}
