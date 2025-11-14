import * as SliderPrimitive from "@radix-ui/react-slider";
import { $word_one, $word_two, $slider_value, $curr_trial_finished } from "@/lib/store";
import { useStore } from "@nanostores/react";

export default function SliderPicker() {
    const sliderValue = useStore($slider_value);
    const selectedValue = useStore($curr_trial_finished)

    const WORD_ONE = useStore($word_one)
    const WORD_TWO = useStore($word_two)

    function pickSliderValue(value : number[])
    {
        $slider_value.set(value[0])
        $curr_trial_finished.set(true)
    }
    
    return (
        <div className="flex items-center space-x-2 py-3">
            <span className="w-50 text-right">{WORD_ONE}</span>
            <SliderPrimitive.Root 
                value={[sliderValue]}
                onValueChange={pickSliderValue}
                className="relative flex items-center w-full h-6"
            >
                <SliderPrimitive.Track className="bg-gray-400 relative w-full h-4 rounded">
                </SliderPrimitive.Track>
                {
                    selectedValue && <SliderPrimitive.Thumb
                        className="w-4 h-4 bg-black border-4 border-black shadow-md focus:outline-none"
                    />
                }
                
            </SliderPrimitive.Root>
            <span className="w-50 text-left">{WORD_TWO}</span>
        </div>
    );
}





