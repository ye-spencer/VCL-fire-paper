import { $instruction_level } from "@/lib/store";
import { useStore } from "@nanostores/react";
// import { $word_one, $word_two } from "@/lib/store";
import { $word_one } from "@/lib/store";

export default function Instruction() {
    let instruction = "";
    const INSTRUCTION_LEVEL = useStore($instruction_level);
    const WORD_ONE = useStore($word_one)
    // const WORD_TWO = useStore($word_two)

    if (INSTRUCTION_LEVEL === 1)
    {
        instruction = "Welcome to our task. Your job will be to view some images and choose the best match based on the instructions."
    }
    else if (INSTRUCTION_LEVEL === 2)
    {
        instruction = "The task is very simple. On each trial, you will see one square. The square will be similar to one of these: "
    }
    else if (INSTRUCTION_LEVEL === 3)
    {
        // instruction = "For each square, please rate how " + WORD_ONE.toLowerCase() + " or " + WORD_TWO.toLowerCase() + " you think the square is. Use your own judgement. Try clicking on the rating bar below this square to give your answer. "

        // instruction = "For each square, please rate how much the square looks like fire. Use your own judgement. Try clicking on the rating bar below this square to give your answer. "

        // if (WORD_ONE === "Less Good for Danger Signal")
        // {
        //     instruction = "For each square, imagine that your job is to select backgrounds for road signs that signal that the road is dangerous. On each trial, the square is the possible background for a sign. Rate each \"sign\" for how good it would be for signaling danger."  
        // }
        // else if (WORD_ONE === "Less Pretty Stone")
        // {
        //     instruction = "For each square, imagine that you are a jeweler who is making a ring. And the square is a closeup of a stone that you could put in the ring. Rate each \"stone\" for how pretty it is."
        // } 

        if (WORD_ONE === "Less Good for Background")
        {
            instruction = "For each square, imagine that you are a jeweler who is making a necklace that will have a diamond in the middle of the pendant, and you need to decide what background would best contrast with the diamond. Rate each \"background\" for how good it would be for contrasting with the diamond."
        }
        else if (WORD_ONE === "Less Good for Safe Signal")
        {
            instruction = "You work for an appliance manufacturer, and your job is to design a new electric stove where the burners illuminate to indicate whether or not they are hot. For each square, imagine that your job is select the best appearance to signal that a burner on an electic stove is <strong>safe</strong> to touch. On each trial, the square is the possible illumination of the burner on the stove. Rate each square for how good it would be as the signal that the burner is <strong>safe</strong> to touch."
        }

    }
    else if (INSTRUCTION_LEVEL === 4)
    {
        // instruction = "Great! When you click, please try to use the entire rating bar. So, for example, if you think the square is only a little " + WORD_ONE.toLowerCase() + ", then you should click just a little left of the middle of the rating bar. And if you think it is very " + WORD_TWO.toLowerCase() + ", then you should click all the way to the right of the rating bar. Try clicking on the rating bar below this square to give your answer."

        // instruction = "Great! When you click, please try to use the entire rating bar. So, for example, if you think the square is only a little bit like fire, then you should click just a little left of the middle of the rating bar. And if you think it is very much like fire, then you should click all the way to the right of the rating bar. Try clicking on the rating bar below this square to give your answer."

        // if (WORD_ONE === "Less Good for Danger Signal")
        // {
        //     instruction = "Great! When you click, please try to use the entire rating bar. So, for example, if you think the \"sign\" is only a little good at signaling danger, then you should click just a little left of the middle of the rating bar. And if you think it is very good at signaling danger, then you should click all the way to the right of the rating bar. Try clicking on the rating bar below this square to give your answer."
        // }
        // else if (WORD_ONE === "Less Pretty Stone")
        // {
        //     instruction = "Great! When you click, please try to use the entire rating bar. So, for example, if you think the \"stone\" is only a little bit pretty, then you should click just a little left of the middle of the rating bar. And if you think it is very pretty, then you should click all the way to the right of the rating bar. Try clicking on the rating bar below this square to give your answer."
        // } 

        if (WORD_ONE === "Less Good for Background")
        {
            instruction = "Great! When you click, please try to use the entire rating bar. So, for example, if you think the \"background\" is only a little bit good at contrasting with the diamond, then you should click a little left of the middle of the rating bar. And if you think it is very good at contrasting with the diamond, then you should click all the way to the right of the rating bar. Try clicking on the rating bar below this square to give your answer."
        }
        else if (WORD_ONE === "Less Good for Safe Signal")
        {
            instruction = "Great! When you click, please try to use the entire rating bar. So, for example, if you think the \"burner\" is only a little bit good at signaling that the stove is <strong>safe</strong> to touch, then you should click a little left of the middle of the rating bar. And if you think it is very good at signaling that the stove is <strong>safe</strong> to touch, then you should click all the way to the right of the rating bar. Try clicking on the rating bar below this square to give your answer."
        }
    }
    else if (INSTRUCTION_LEVEL === 5)
    {
        instruction = "Great! Now let's try 10 practice trials so you can get used to the kinds of squares you will see."
    }
    else if (INSTRUCTION_LEVEL > 5 && INSTRUCTION_LEVEL <= 15)
    {
        // instruction = "Please rate how " + WORD_ONE.toLowerCase() + " or " + WORD_TWO.toLowerCase() + " you think the square is."

        // instruction = "Please rate how much you think the square looks like fire."

        // if (WORD_ONE === "Less Good for Danger Signal")
        // {
        //     instruction = "Please rate how good you think the \"sign\" is at signaling danger."
        // }
        // else if (WORD_ONE === "Less Pretty Stone")
        // {
        //     instruction = "Please rate how pretty you think the \"stone\" is."
        // } 

        if (WORD_ONE === "Less Good for Background")
        {
            instruction = "Please rate how good you think the \"background\" is at contrasting with the diamond"
        }
        else if (WORD_ONE === "Less Good for Safe Signal")
        {
            instruction = "Please rate how good you think the \"burner\" is at signaling that the stove is <strong>safe</strong> to touch"
        }
    }
    else if (INSTRUCTION_LEVEL === 16)
    {
        instruction = "Great! Now you are ready for the task. Please click the rating bar for each trial. There will be 90 trials and the total task time will be approximately 10 minutes."
    }
    else if (INSTRUCTION_LEVEL > 16 && INSTRUCTION_LEVEL <= 106)
    {
        // instruction = "Please rate how " + WORD_ONE.toLowerCase() + " or " + WORD_TWO.toLowerCase() + " you think the square is."

        // instruction = "Please rate how much you think the square looks like fire."

        // if (WORD_ONE === "Less Good for Danger Signal")
        // {
        //     instruction = "Please rate how good you think the \"sign\" is at signaling danger."
        // }
        // else if (WORD_ONE === "Less Pretty Stone")
        // {
        //     instruction = "Please rate how pretty you think the \"stone\" is."
        // } 

        if (WORD_ONE === "Less Good for Background")
        {
            instruction = "Please rate how good you think the \"background\" is at contrasting with the diamond"
        }
        else if (WORD_ONE === "Less Good for Safe Signal")
        {
            instruction = "Please rate how good you think the \"burner\" is at signaling that the stove is <strong>safe</strong> to touch"
        }
    }
    else if (INSTRUCTION_LEVEL === 107)
    {
        instruction = "Thank you for participating! You are now finished."
    }
    else
    {
        instruction = "ERROR UNKNOWN LEVEL"
    }

    return (
      <div className="px-8 pt-10 pb-4 text-lg">
        <div dangerouslySetInnerHTML={{ __html: instruction }} />
        {INSTRUCTION_LEVEL === 107 && <a href="https://app.prolific.com/submissions/complete?cc=C1ESBDKN" className="text-blue-500 hover:text-blue-700 font-bold"> Please click this link to return to Prolific.</a>}
      </div>
    );
  }
  