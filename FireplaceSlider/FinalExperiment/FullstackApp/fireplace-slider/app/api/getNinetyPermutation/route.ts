import { NextResponse } from "next/server";

export async function GET() 
{

    const arr = Array.from({ length: 90 }, (_, i) => i); // Create array [0, 1, ..., 89]
    
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }

    

    
    return NextResponse.json({
        perm : arr
    });
}
