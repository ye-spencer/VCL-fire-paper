"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { $curr_trial_finished, $instruction_level, $last_trial_time, increment_instruction, resetSlider } from "@/lib/store";
import { useStore } from "@nanostores/react";

export default function CustomLoader()
{
    const [progress, setProgress] = useState(0);
    const [loadingDuration, setNextDuration] = useState(7000);
    const INSTRUCTION_LEVEL = useStore($instruction_level); 

    const TRIAL_DURATION = 1000;

    const loadingTimes = [
        0, /* Level 1, Already Set */
        10000, /* Level 2 */
        12000,
        14000, 
        15000,
        7000,
        TRIAL_DURATION, /* Example 1 */
        TRIAL_DURATION, /* Example 2 */
        TRIAL_DURATION, /* Example 3 */
        TRIAL_DURATION, /* Example 4 */
        TRIAL_DURATION, /* Example 5 */
        TRIAL_DURATION, /* Example 6 */
        TRIAL_DURATION, /* Example 7 */
        TRIAL_DURATION, /* Example 8 */
        TRIAL_DURATION, /* Example 9 */
        TRIAL_DURATION, /* Example 10 */
        8000, /* Screen for Starting Real Trials */
        TRIAL_DURATION, /* Trial 1 */
        TRIAL_DURATION, /* Trial 2 */
        TRIAL_DURATION, /* Trial 3 */
        TRIAL_DURATION, /* Trial 4 */
        TRIAL_DURATION, /* Trial 5 */
        TRIAL_DURATION, /* Trial 6 */
        TRIAL_DURATION, /* Trial 7 */
        TRIAL_DURATION, /* Trial 8 */
        TRIAL_DURATION, /* Trial 9 */
        TRIAL_DURATION, /* Trial 10 */
        TRIAL_DURATION, /* Trial 11 */
        TRIAL_DURATION, /* Trial 12 */
        TRIAL_DURATION, /* Trial 13 */
        TRIAL_DURATION, /* Trial 14 */
        TRIAL_DURATION, /* Trial 15 */
        TRIAL_DURATION, /* Trial 16 */
        TRIAL_DURATION, /* Trial 17 */
        TRIAL_DURATION, /* Trial 18 */
        TRIAL_DURATION, /* Trial 19 */
        TRIAL_DURATION, /* Trial 20 */
        TRIAL_DURATION, /* Trial 21 */
        TRIAL_DURATION, /* Trial 22 */
        TRIAL_DURATION, /* Trial 23 */
        TRIAL_DURATION, /* Trial 24 */
        TRIAL_DURATION, /* Trial 25 */   
        TRIAL_DURATION, /* Trial 26 */
        TRIAL_DURATION, /* Trial 27 */
        TRIAL_DURATION, /* Trial 28 */
        TRIAL_DURATION, /* Trial 29 */
        TRIAL_DURATION, /* Trial 30 */
        TRIAL_DURATION, /* Trial 31 */
        TRIAL_DURATION, /* Trial 32 */
        TRIAL_DURATION, /* Trial 33 */
        TRIAL_DURATION, /* Trial 34 */
        TRIAL_DURATION, /* Trial 35 */
        TRIAL_DURATION, /* Trial 36 */
        TRIAL_DURATION, /* Trial 37 */
        TRIAL_DURATION, /* Trial 38 */
        TRIAL_DURATION, /* Trial 39 */           
        TRIAL_DURATION, /* Trial 40 */
        TRIAL_DURATION, /* Trial 41 */
        TRIAL_DURATION, /* Trial 42 */
        TRIAL_DURATION, /* Trial 43 */
        TRIAL_DURATION, /* Trial 44 */
        TRIAL_DURATION, /* Trial 45 */  
        TRIAL_DURATION, /* Trial 46 */
        TRIAL_DURATION, /* Trial 47 */
        TRIAL_DURATION, /* Trial 48 */
        TRIAL_DURATION, /* Trial 49 */
        TRIAL_DURATION, /* Trial 50 */
        TRIAL_DURATION, /* Trial 51 */
        TRIAL_DURATION, /* Trial 52 */
        TRIAL_DURATION, /* Trial 53 */
        TRIAL_DURATION, /* Trial 54 */
        TRIAL_DURATION, /* Trial 55 */
        TRIAL_DURATION, /* Trial 56 */
        TRIAL_DURATION, /* Trial 57 */  
        TRIAL_DURATION, /* Trial 58 */
        TRIAL_DURATION, /* Trial 59 */
        TRIAL_DURATION, /* Trial 60 */
        TRIAL_DURATION, /* Trial 61 */
        TRIAL_DURATION, /* Trial 62 */
        TRIAL_DURATION, /* Trial 63 */
        TRIAL_DURATION, /* Trial 64 */
        TRIAL_DURATION, /* Trial 65 */
        TRIAL_DURATION, /* Trial 66 */
        TRIAL_DURATION, /* Trial 67 */
        TRIAL_DURATION, /* Trial 68 */
        TRIAL_DURATION, /* Trial 69 */
        TRIAL_DURATION, /* Trial 70 */
        TRIAL_DURATION, /* Trial 71 */
        TRIAL_DURATION, /* Trial 72 */
        TRIAL_DURATION, /* Trial 73 */
        TRIAL_DURATION, /* Trial 74 */
        TRIAL_DURATION, /* Trial 75 */
        TRIAL_DURATION, /* Trial 76 */
        TRIAL_DURATION, /* Trial 77 */
        TRIAL_DURATION, /* Trial 78 */
        TRIAL_DURATION, /* Trial 79 */
        TRIAL_DURATION, /* Trial 80 */
        TRIAL_DURATION, /* Trial 81 */
        TRIAL_DURATION, /* Trial 82 */
        TRIAL_DURATION, /* Trial 83 */
        TRIAL_DURATION, /* Trial 84 */
        TRIAL_DURATION, /* Trial 85 */
        TRIAL_DURATION, /* Trial 86 */
        TRIAL_DURATION, /* Trial 87 */
        TRIAL_DURATION, /* Trial 88 */
        TRIAL_DURATION, /* Trial 89 */
        TRIAL_DURATION, /* Trial 90 */
        7000, /* Thank You Screen */
        
    ]

    const handleClick = () => 
    {
        setProgress(0);
        increment_instruction();
        $curr_trial_finished.set(false);
        setNextDuration(loadingTimes[INSTRUCTION_LEVEL + 1]);
        resetSlider();
        $last_trial_time.set((new Date()).getTime());
    };

    useEffect(() => {
        const startTime = Date.now();
        
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / loadingDuration) * 100, 100);
            setProgress(percentage);
    
            if (percentage >= 100)
            {
                clearInterval(interval)
            }
        }, 100);
    
        return () => clearInterval(interval);
      }, [loadingDuration, INSTRUCTION_LEVEL]);

    return (
        <div className="px-20 h-24">
            <div className="h-16 flex justify-center items-center">
                { progress >= 100 && 
                    <Button className="items-center" onClick={handleClick}> Next </Button>
                }
            </div>
            <Progress value={ Math.min(100, progress * 1.03) }/>
        </div>
    )
}