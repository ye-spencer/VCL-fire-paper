# Fireplace Slider Final Experiment Fullstack App

## Overview

This is a Next.js project that contains all the deployable code to run a web experiment for this. The actual project is stored in the sub-folder.

## Running / Dependencies

To run locally, you need the `npm` package manager. Then run `npm install` followed by `npm run dev`.

This project is hosted (i.e. running on a accessable server) on Vercel, utilizing the Platform as a Service (Paas).

You need a `.env` file containing the relevant information. See `env.example` for more information. Additionally, this experiment connects to a specific AWS S3 account, which is the object-storage service of choice to store superpixel information (see below), and a URL is needed for that. The objects should be public, and I'll probably keep hosting them for now until whenever this whole project is over (it's $1.52 a month, I'll survive).

## Parts

There is a lot of junk files, a lot of which I don't fully understand exactly what it does.

The most important part is the `instruction.tsx` page. This was the only file that changed between iterations of the experiment, where we changed the instructions that were displayed. You can see various iterations of instructions. I left them there as a audit log.

## General Idea

In this experiment, participants, after a introduction and a few practice rounds, are asked to rate 90 'superpixels' on a scale of 0-100 (collected from the slider bar) for a given attribute (based on the prompt/instructions given) about the 'superpixel'.

Each superpixel is a average color of a 24x24 square in a video of a fireplace. This video was split into a 9x10 grid of rectangles (called chunks). Each participant was shown a single superpixel from each chunk. More specifically, they were shown a superpixel that was collected from the same offset in each chunk (that is, the distance from the top-left corner of the chunk to the top-left corner of the superpixel is the same).