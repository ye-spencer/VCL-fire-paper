"use client"

import CustomLoader from "@/components/Fireplace/custom-loader";
import Instruction from "@/components/Fireplace/instruction";
import RandomDisplay from "@/components/Fireplace/random-display";
import TrialScreen from "@/components/Fireplace/trial-screen";
import { $instruction_level, setWords, setTrialsPermutation, setXY, setFrames, $prolificId, $sessionId, $studyId } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Suspense, useEffect } from "react";
import { getFrames, getRandomWords, getTrialsPermutation } from "@/lib/api";
import { FIRST_EXAMPLE_TRIAL, FIRST_TRIAL, LAST_EXAMPLE_TRIAL, LAST_TRIAL, FIRST_HELPER_TRIAL, LAST_HELPER_TRIAL, FIRST_DISPLAY_LEVEL, LAST_DISPLAY_LEVEL } from "@/lib/variables";
import { useSearchParams } from 'next/navigation';


export default function Home() 
{

    const INSTRUCTION_LEVEL = useStore($instruction_level);

    const Params = () => {
        const searchParams = useSearchParams();
        const prolificId = searchParams.get('PROLIFIC_PID') || 'X';
        const studyId = searchParams.get('STUDY_ID') || 'X';
        const sessionId = searchParams.get('SESSION_ID') || 'X';

        useEffect(() => {
            $prolificId.set(prolificId);
            $studyId.set(studyId);
            $sessionId.set(sessionId);
        }, [prolificId, studyId, sessionId]);

        return null;
    }

    function ifLevelIsExample()
    {
        return (INSTRUCTION_LEVEL >= FIRST_EXAMPLE_TRIAL && INSTRUCTION_LEVEL <= LAST_EXAMPLE_TRIAL)
    }

    function ifLevelIsTrial()
    {
        return (INSTRUCTION_LEVEL >= FIRST_TRIAL && INSTRUCTION_LEVEL <= LAST_TRIAL) 
    }

    function ifLevelIsHelper()
    {
        return (INSTRUCTION_LEVEL >= FIRST_HELPER_TRIAL && INSTRUCTION_LEVEL <= LAST_HELPER_TRIAL)
    }

    function ifLevelNeedsTrial()
    {
        return ifLevelIsTrial() || ifLevelIsExample() || ifLevelIsHelper()
    }

    function ifLevelNeedsDisplay ()
    {
        return INSTRUCTION_LEVEL >= FIRST_DISPLAY_LEVEL && INSTRUCTION_LEVEL <= LAST_DISPLAY_LEVEL;
    }

    useEffect(() => {
        const initialize = async () => {
            const [x, y, sampleFrames, exampleFrames, trialFrames] = await getFrames();
            const [wordOne, wordTwo] = await getRandomWords();
            const permutation = await getTrialsPermutation();
            setFrames(sampleFrames, exampleFrames, trialFrames);
            setXY(x, y);
            setWords(wordOne, wordTwo);
            setTrialsPermutation(permutation);
            
        };
        initialize();
    }, []);


    return (
        <div className="flex min-h-dvh">
            <Suspense>
                <Params />
            </Suspense>
            <div className="flex-1 min-w-14">
                <div className="p-4 text-base"> 
                    {
                        ifLevelIsTrial() && `Trial # ${INSTRUCTION_LEVEL - FIRST_TRIAL + 1} / 90`
                    }
                    {
                        ifLevelIsExample() && `Trial # ${INSTRUCTION_LEVEL - FIRST_EXAMPLE_TRIAL + 1} / 10`
                    }
                </div>
            </div>
            <div className="flex-2 flex flex-col min-h-screen p-1 bg-white">
                <Instruction/>
                { ifLevelNeedsDisplay() && <RandomDisplay/> /* Meat of anything else to display */}
                { ifLevelNeedsTrial() && <TrialScreen/> /* Slider pick if needed */}
                <div className="flex-grow">{/* Buffer */}</div>
                { ((!ifLevelNeedsTrial() || ifLevelIsHelper()) && INSTRUCTION_LEVEL < 107) && <CustomLoader/> /* Loader if needed */}
                
              </div>
            <div className="flex-1">
            </div>
        </div>
    );
}
