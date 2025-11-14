export async function getFrames()
{
    const response = await fetch("/api/getFrames");
    const data = await response.json();

    return [data.x, data.y, data.helper, data.example, data.trial];
}

export async function getRandomWords()
{
    const response = await fetch("/api/getRandomWords"); //TODO, learn how these work in terms of production
    const data = await response.json();

    return [data.one, data.two]
}

export async function getTrialsPermutation()
{
    const response = await fetch("/api/getNinetyPermutation");
    const data = await response.json();
    return data.perm;
}

export async function sendData(data: {
    date: string,
    trial_time: number,
    value: number,
    x: number,
    y: number,
    word_one: string,
    word_two: string,
    trial_number: number,
    chunk_number: number,
    prolific_id: string,
    study_id: string,
    session_id: string
})
{
    const response = await fetch("/api/sendData", { method: "POST", body: JSON.stringify(data) });
    const responseData = await response.json();
    return responseData;
}