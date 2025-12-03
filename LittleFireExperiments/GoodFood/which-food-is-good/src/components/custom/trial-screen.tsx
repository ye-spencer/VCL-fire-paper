import { Button } from "@/components/ui/button";
import { $instruction_level, getFirstCooked, getFoodType, getProlificId, getSecondCooked, getSessionId, getStudyId, increment_instruction } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { sendDataToServer } from "@/lib/api";

export default function TrialScreen()
{

    const [trialStartTime, setTrialStartTime] = useState(0);

    const [selected, setSelected] = useState<string>("");
    
    const handleClick = (choice : string) =>
    {
        setSelected(choice);
    }

    const handleSubmit = () =>
    {
        sendDataToServer({
            startTime: trialStartTime,
            endTime: Date.now(),
            selected: selected,
            prolificId: getProlificId(),
            studyId: getStudyId(),
            sessionId: getSessionId(),
            foodType: getFoodType(),
            firstCooked: getFirstCooked(),
            secondCooked: getSecondCooked()
        });
        increment_instruction();
    }

    const [progress, setProgress] = useState(0);
    const loadingDuration = 5000;
    const INSTRUCTION_LEVEL = useStore($instruction_level); 

    useEffect(() => {
        const startTime = Date.now();
        
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / loadingDuration) * 100, 100);
            setProgress(percentage);
    
            if (percentage >= 100)
            {
                clearInterval(interval)
                setTrialStartTime(Date.now());
            }
        }, 100);
    
        return () => clearInterval(interval);
      }, [INSTRUCTION_LEVEL]);

    return (
        <div className="h-24">
            {progress < 100 ? (
                <div className="px-10">
                    <div className="flex-grow">{/* Buffer */}</div>
                    <Progress value={ Math.min(100, progress * 1.03) }/>
                </div>
            ) : (
                <>
                    <div className="flex justify-center gap-4 my-4">   
                        <Button 
                            onClick={() => handleClick(getFirstCooked())} 
                            className={`text-xl p-2 shadow-lg transform hover:scale-110 transition-transform w-[45%] border-2 relative ${
                                selected === getFirstCooked() 
                                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                                    : 'bg-white hover:bg-gray-100 text-black border-black'
                            }`}>
                            {getFirstCooked()}
                        </Button>
                        <Button 
                            onClick={() => handleClick(getSecondCooked())} 
                            className={`text-xl p-2 shadow-lg transform hover:scale-110 transition-transform w-[45%] border-2 relative ${
                                selected === getSecondCooked()
                                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                                    : 'bg-white hover:bg-gray-100 text-black border-black'
                            }`}
                        >
                            {getSecondCooked()}
                        </Button>
                    </div>
                    <div className="h-16 flex justify-center items-center">
                        { selected && <Button className="relative" onClick={handleSubmit}> Submit Answer </Button> }
                    </div>
                </>
            )}
        </div>
    );
}