import { atom } from "nanostores";

export const $instruction_level = atom<number>(1);
export function increment_instruction()
{
    $instruction_level.set($instruction_level.get() + 1);
}

export const $slider_value = atom<number>(-1);
export function resetSlider()
{
    $slider_value.set(-1);
}

export const $word_one = atom<string>("ERROR");
export const $word_two = atom<string>("ERROR");
export function setWords(word_one: string, word_two: string)
{
    $word_one.set(word_one);
    $word_two.set(word_two);
}

export const $curr_trial_finished = atom<boolean>(false);

export const $helperFrames = atom<string[][]>([]);
export const $exampleFrames = atom<string[][]>([]);
export const $trialFrames = atom<string[][]>([]);

export function setFrames(helperFrames: string[][], exampleFrames: string[][], trialFrames: string[][])
{
    $helperFrames.set(helperFrames);
    $exampleFrames.set(exampleFrames);
    $trialFrames.set(trialFrames);
}

export const $currentX = atom<number>(-1);
export const $currentY = atom<number>(-1);

export function setXY(x: number, y: number)
{
    $currentX.set(x);
    $currentY.set(y);
}

export const $trialsPermutation = atom<number[]>([]);

export function setTrialsPermutation(permutation: number[])
{
    $trialsPermutation.set(permutation);
}

export const $last_trial_time = atom<number>(0);

export const $prolificId = atom<string>("");
export const $studyId = atom<string>("");
export const $sessionId = atom<string>("");





