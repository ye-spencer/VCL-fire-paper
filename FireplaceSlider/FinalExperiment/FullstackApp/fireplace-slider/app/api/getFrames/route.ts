import { NextResponse } from "next/server";

export async function GET() 
{


    async function run() 
    {
        const x = Math.floor(Math.random() * 324);
        const y = Math.floor(Math.random() * 216);

        const helper = await fetch("https://halberdalab-fireplaceslider-firevideos.s3.us-east-2.amazonaws.com/helpers.json");
        const helperData = await helper.json();

        const examples = await fetch("https://halberdalab-fireplaceslider-firevideos.s3.us-east-2.amazonaws.com/examples.json");
        const exampleData = await examples.json();

        const trial = await fetch(`https://halberdalab-fireplaceslider-firevideos.s3.us-east-2.amazonaws.com/output_json/trial_data${x}-${y}.json`);
        const trialData = await trial.json();

        return {
            x: x,
            y: y,
            helper: helperData.data,
            example: exampleData.data,
            trial: trialData.data
        };
    }

    try 
    {
        const result = await run();
        return NextResponse.json(result);
    } 
    catch (err) 
    {
        console.error(err);
        return NextResponse.json({
            x: -1,
            y: -1,
            helper: [["0,0,0", "0,0,0", "0,0,0"]],
            example: [["0,0,0", "0,0,0", "0,0,0"]],
            trial: [["0,0,0", "0,0,0", "0,0,0"]]
        });
    }
}
