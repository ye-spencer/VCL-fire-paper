import { atom } from "nanostores";

export const $instruction_level = atom<number>(0);
export function increment_instruction()
{
    $instruction_level.set($instruction_level.get() + 1);
}

export const $trial_start_time = atom<number>(0);
export function setStartTimeNow()
{
    $trial_start_time.set((new Date()).getTime());
}


export const $first_cooked = atom<string>("");
export const $second_cooked = atom<string>("");
export const $food_type = atom<string>("");

export function initializeData(firstCooked : string, secondCooked : string, foodType : string)
{
    $first_cooked.set(firstCooked);
    $second_cooked.set(secondCooked);
    $food_type.set(foodType);
}

export function getFoodType()
{
    return $food_type.get();
}

export function getFirstCooked()
{
    return $first_cooked.get();
}

export function getSecondCooked()
{
    return $second_cooked.get();
}

export const $prolificId = atom<string>("");
export const $studyId = atom<string>("");
export const $sessionId = atom<string>("");

export function getProlificId()
{
    return $prolificId.get();
}

export function getStudyId()
{
    return $studyId.get();
}

export function getSessionId()
{
    return $sessionId.get();
}

export function setProlificId(prolificId : string)
{
    $prolificId.set(prolificId);
}

export function setStudyId(studyId : string)
{
    $studyId.set(studyId);
}

export function setSessionId(sessionId : string)
{
    $sessionId.set(sessionId);
}