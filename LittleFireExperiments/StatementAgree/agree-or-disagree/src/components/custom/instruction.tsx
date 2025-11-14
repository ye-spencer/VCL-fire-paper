"use client"

import { $instruction_level } from "@/lib/store";
import { END_LEVEL, TRIAL_LEVEL } from "@/lib/variables";
import { useStore } from "@nanostores/react";
import { getOrder } from "@/lib/store";

export default function Instruction() 
{
    let instruction = "Central Level"
    const INSTRUCTION_LEVEL = useStore($instruction_level);

    const order = getOrder();


    if (INSTRUCTION_LEVEL === 0)
    {
        instruction = "Welcome to our task. During this survey, on each page, you will see a statement with a response bar below it. The response bar will range from \"I totally Agree\" to \"I totally Disagree\". For each statement, please click on the bar to provide your answer. The screen will then move to the next statement.";
    }
    else if (INSTRUCTION_LEVEL >= TRIAL_LEVEL && INSTRUCTION_LEVEL < END_LEVEL)
    {
        instruction = order[INSTRUCTION_LEVEL - TRIAL_LEVEL];
    }
    else if (INSTRUCTION_LEVEL === END_LEVEL)
    {
        instruction = "Thank you for your participation.";
    }
    else
    {
        instruction = "Error: Improper Button Click, Please Refresh"
    }

    return (
        <div className="px-8 pt-10 pb-4 text-lg">
            <div dangerouslySetInnerHTML={{ __html: instruction }} />
            {INSTRUCTION_LEVEL === END_LEVEL && <a href="https://app.prolific.com/submissions/complete?cc=C1MRKKO5" className="text-blue-500 hover:text-blue-700 font-bold"> Please click this link to return to Prolific.</a>}
        </div>
    )
}