# Little Fire Experiments

## Overview

The projects in this subfolders are all smaller-scale projects. Each is a full-stack experiment with a bit of analysis.

The experiments are short, none longer than ~2 minutes. They are basically glorified, controlled surveys. These let us explore some of the perceptions and intuitions people have around fire.

Each subfolder has a respective subfolder contains the Next.js project that was hosted on Vercel, and another subfolder called `analysis` that contains the raw data, as well as analysis to generate the final graphs representing results.

## Database

Each of these experiments connects to the same PostgreSQL database, so they share the same connection. However, each experiment uses an isolated table, so no conflicts should arise.
