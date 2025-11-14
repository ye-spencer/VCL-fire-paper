import * as SliderPrimitive from "@radix-ui/react-slider";
import { useState } from "react";

export default function SliderPicker({ handleClick } : { handleClick : (value : number) => void }) {
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [selectedValue, setSelectedValue] = useState<boolean>(false);

    const WORD_TWO = "I totally agree";
    const WORD_ONE = "I totally disagree";

    return (
        <div className="flex items-center space-x-2 py-3">
            <span className="w-50 text-right">{WORD_ONE}</span>
            <SliderPrimitive.Root 
                value={[sliderValue]}
                onValueChange={(value : number[]) => {
                    setSliderValue(value[0]);
                    setSelectedValue(true);
                    handleClick(value[0]);
                }}
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





