import { Button } from "@/components/ui/button";
import { $instruction_level, getOrder, getProlificId, getSessionId, getStudyId, getTrialStartTime, increment_instruction } from "@/lib/store";
import { useState } from "react";
import { sendDataToServer } from "@/lib/api";
import { useStore } from "@nanostores/react";
import { TRIAL_LEVEL } from "@/lib/variables";
import SliderPicker from "@/components/custom/slider-picker";

export default function TrialScreen()
{

    const INSTRUCTION_LEVEL = useStore($instruction_level);

    const [value, setValue] = useState<number>(-1);
    
    const handleClick = (choice : number) =>
    {
        setValue(choice);
    }

    const handleSubmit = () =>
    {
        sendDataToServer({
            duration: Date.now() - getTrialStartTime(),
            question: getOrder()[INSTRUCTION_LEVEL - TRIAL_LEVEL],
            value: value,
            prolificId: getProlificId(),
            studyId: getStudyId(),
            sessionId: getSessionId(),
            order: getOrder()
        });
        increment_instruction();
        setValue(-1);
    }

    return (
        <div className="w-full">
            <>
                <div className="h-[50%]"></div>
                <div className="w-[90%] mx-auto">
                    <SliderPicker key={INSTRUCTION_LEVEL} handleClick={handleClick} />
                </div>
                <div className="h-16 flex justify-center items-center">
                    { (value !== -1) && <Button className="relative" onClick={handleSubmit}> Submit Answer </Button> }
                </div>
            </>
        </div>
    );
}
