import { db } from "@/drizzle/db";
import { dataTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) 
{

    const { date, trial_time, value, x, y, word_one, word_two, trial_number, chunk_number, prolific_id, study_id, session_id } = await req.json();

    try 
    {
        const newData = await db.insert(dataTable).values({date, trial_time, value, x, y, word_one, word_two, trial_number, chunk_number, prolific_id, study_id, session_id }).returning();

        // TOLEARN: so these have to line up with the neon schema names? which we generated with the sql command
        // and then so we have to use these same names in the schema.ts file?
        // and i really need to learn about this whole sql schema business LMAO

        // SO we failed a lot because we didn't have the right names in the schema.ts file,
        // and then we also failed because we didn't have the table in the right place, and then neon also only finds a certain place of table

        return NextResponse.json({ success: true, data: newData });
    } 
    catch (error) 
    {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
