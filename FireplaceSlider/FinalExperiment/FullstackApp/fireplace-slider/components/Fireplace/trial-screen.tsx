import { $curr_trial_finished, $currentX, $currentY, $instruction_level, $last_trial_time, $prolificId, $sessionId, $slider_value, $studyId, $trialsPermutation, $word_one, $word_two, increment_instruction, resetSlider } from "@/lib/store";
import SliderPicker from "./slider-picker";
import VideoTest from "./square-video";
import { Button } from "../ui/button";
import { useStore } from "@nanostores/react";
import { FIRST_TRIAL } from "@/lib/variables";
import { sendData } from "@/lib/api";
export default function TrialScreen ()
{

    const selectedValue = useStore($curr_trial_finished);
    const INSTRUCTION_LEVEL = useStore($instruction_level);

    const handleClick = () => 
    {
        const curr_time = new Date();
        const curr_trial_time = curr_time.getTime() - $last_trial_time.get(); // TODO: make sure this is correct with the curr_trial and time since last trial
        $curr_trial_finished.set(false)
        $last_trial_time.set(curr_time.getTime());

        if (INSTRUCTION_LEVEL >= FIRST_TRIAL)
        {
            const data = {
                "date" : curr_time.toISOString(),
                "trial_time" : curr_trial_time,
                "value" : $slider_value.get(),
                "x" : $currentX.get(),
                "y" : $currentY.get(),
                "word_one" : $word_one.get(),
                "word_two" : $word_two.get(),
                "trial_number" : INSTRUCTION_LEVEL - FIRST_TRIAL + 1,
                "chunk_number" : $trialsPermutation.get()[INSTRUCTION_LEVEL - FIRST_TRIAL],
                "prolific_id" : $prolificId.get(),
                "study_id" : $studyId.get(),
                "session_id" : $sessionId.get()
            }
            sendData(data);
        }
        increment_instruction();
        resetSlider();
    };

    return (
        <div className="px-5 py-3 text-lg">
            <VideoTest/>
            <SliderPicker/>
            <div className="h-12 flex justify-center items-center">
                { (selectedValue && (INSTRUCTION_LEVEL !== 3 && INSTRUCTION_LEVEL !== 4)) && 
                    <Button className="items-center" onClick={handleClick}> Next Trial </Button>
                }
            </div>
        </div>
    );
}
  