"use client"

import { $exampleFrames, $helperFrames, $instruction_level, $trialFrames, $trialsPermutation } from "@/lib/store";
import { FIRST_TRIAL, LAST_EXAMPLE_TRIAL, LAST_HELPER_TRIAL, LAST_TRIAL, FIRST_HELPER_TRIAL, FIRST_EXAMPLE_TRIAL } from "@/lib/variables";
import { useStore } from "@nanostores/react";
import { useState, useEffect } from "react";

export default function VideoTest() 
{
    const INSTRUCTION_LEVEL = useStore($instruction_level);

    const TRIALS_PERMUTATION = useStore($trialsPermutation);

    let videoData = ["0,0,0"];
        
    if (INSTRUCTION_LEVEL >= FIRST_HELPER_TRIAL && INSTRUCTION_LEVEL <= LAST_HELPER_TRIAL)
    {
        videoData = $helperFrames.get()[INSTRUCTION_LEVEL - FIRST_HELPER_TRIAL]
    }
    else if (INSTRUCTION_LEVEL >= FIRST_EXAMPLE_TRIAL && INSTRUCTION_LEVEL <= LAST_EXAMPLE_TRIAL)
    {
        videoData = $exampleFrames.get()[INSTRUCTION_LEVEL - FIRST_EXAMPLE_TRIAL];
    }
    else if (INSTRUCTION_LEVEL >= FIRST_TRIAL && INSTRUCTION_LEVEL <= LAST_TRIAL)
    {
        videoData = $trialFrames.get()[TRIALS_PERMUTATION[INSTRUCTION_LEVEL - FIRST_TRIAL]];
    }

    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % 720);
        }, 1000 / 24);
    
        setFrame(0);

        return () => clearInterval(interval); // Cleanup interval
    }, [INSTRUCTION_LEVEL]);

    return (
        <div className="w-48 h-48 mx-auto"
            style={{ backgroundColor: `rgb(${videoData[frame]})` }}
        />
    );
}
