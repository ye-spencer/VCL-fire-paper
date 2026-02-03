# Fireplace Slider Data Analysis

## Overview

These folders are various data analysis files for the fireplace slider project. Each folder is a self contained analysis that can be run independently. By a byproduct of this, there is code duplication between folders. This is intentional as it makes it easier to run the analysis independently. Raw and processed data is stored in the `data` folder. Outputs are stored in the `outputs` folder.

## Usage

Each folder has `.py` files that start with a letter, run these in alphabetical order. 

Occasionally, some files with multiple versions (like flicker measurement) will have multiple under the same alphabetical letter (like a1, a2, a3, etc.). In this case, run them in numerical order if they can be run, else skip.

## File Naming Convention

I started with numbers, but that was a bad idea, as it prevent importing between files.