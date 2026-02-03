# FireplaceSlider Data Analysis - Smoothing Charts

## To Run

You must run through all iterations of the CONFIG.py file to get all charts for each word.

Change the iteration value in CONFIG.py to run through all iterations.

Run z-calculate_average.py after all iterations are run.

## What it does

For each axis that we measured: pretty, dangerous, safe, ugly: we create a coverage map, a coverage map that includes the value for each superpixel that was shown to a participant, a smoothed graph using a gaussian filter with a sigma of 128, and a histogram of the smoothed values per pixel.

Finally, we create a blended graph of all the smoothed graphs.