import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json

def scatterplot_it_up(flicker_scores, file_prefix):

    df_pd = pd.read_csv('data/averaged_data.csv')

    df_pd_grouped = df_pd.groupby(['word_one', 'chunk_number'])["averaged_value"].mean()

    dangerous_scores = df_pd_grouped.loc['Less Good for Danger Signal'].sort_index()
    pretty_scores = df_pd_grouped.loc["Less Pretty Stone"].sort_index()

    max_flicker_score = max(flicker_scores)
    flicker_scores = [score / max_flicker_score for score in flicker_scores]


    # Pretty Scores vs Flicker Scores
    plt.figure(figsize=(10, 6))
    plt.scatter(flicker_scores, pretty_scores, alpha=0.5)

    plt.xlabel('Flicker Score')
    plt.ylabel('Jeweler Pretty Score') 
    plt.title('Flicker vs Jeweler Pretty Scores')

    plt.xlim(0, 1)
    plt.ylim(0, 1)

    z = np.polyfit(flicker_scores, pretty_scores, 1)
    p = np.poly1d(z)
    plt.plot(flicker_scores, p(flicker_scores), "r--", alpha=0.8)

    # Calculate correlation coefficient
    correlation = np.corrcoef(flicker_scores, pretty_scores)[0,1]

    # Add stats text to plot
    stats_text = f'Correlation: {correlation:.3f}\nSlope: {z[0]:.3f}\nIntercept: {z[1]:.3f}'
    plt.text(0.05, 0.95, stats_text, transform=plt.gca().transAxes, 
            verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

    plt.savefig(f'outputs/{file_prefix}_vs_jeweler_pretty_scores.png')



    # Dangerous Scores vs Flicker Scores
    plt.figure(figsize=(10, 6))
    plt.scatter(flicker_scores, dangerous_scores, alpha=0.5)

    plt.xlabel('Flicker Score')
    plt.ylabel('Sign-Dangerous Score') 
    plt.title('Flicker vs Sign-Dangerous Scores')

    plt.xlim(0, 1)
    plt.ylim(0, 1)

    z = np.polyfit(flicker_scores, dangerous_scores, 1)
    p = np.poly1d(z)
    plt.plot(flicker_scores, p(flicker_scores), "r--", alpha=0.8)

    # Calculate correlation coefficient
    correlation = np.corrcoef(flicker_scores, dangerous_scores)[0,1]

    # Add stats text to plot
    stats_text = f'Correlation: {correlation:.3f}\nSlope: {z[0]:.3f}\nIntercept: {z[1]:.3f}'
    plt.text(0.05, 0.95, stats_text, transform=plt.gca().transAxes,             
            verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

    plt.savefig(f'outputs/{file_prefix}_vs_sign_dangerous_scores.png')


from c_1_calculate_flickerness_abs_rgb_change import run_calculation as run_calculation_abs_rgb_change
from c_2_calculate_flickerness_luminous_change import run_calculation as run_calculation_luminous_change
from c_3_calculate_flickerness_luminous_std import run_calculation as run_calculation_luminous_std
from c_4_calculate_flickerness_abs_rgb_change_weighted import run_calculation as run_calculation_abs_rgb_change_weighted
from c_5_calculate_flickerness_abs_rgb_change_weighted_log import run_calculation as run_calculation_abs_rgb_change_weighted_log


SKIP_SIZE = 24

result_abs_rgb_change = run_calculation_abs_rgb_change(SKIP_SIZE)
file_prefix = f"fsum_abs_rgb_change__skip_{SKIP_SIZE}"
json.dump(result_abs_rgb_change, open("data/{}.json".format(file_prefix), "w"))
scatterplot_it_up(result_abs_rgb_change, file_prefix)


result_luminous_change = run_calculation_luminous_change(SKIP_SIZE)
file_prefix = f"fsum_luminous_change__skip_{SKIP_SIZE}"
json.dump(result_luminous_change, open("data/{}.json".format(file_prefix), "w"))
scatterplot_it_up(result_luminous_change, file_prefix)


result_luminous_std = run_calculation_luminous_std(SKIP_SIZE)
file_prefix = f"fsum_luminous_std__skip_{SKIP_SIZE}"
json.dump(result_luminous_std, open("data/{}.json".format(file_prefix), "w"))
scatterplot_it_up(result_luminous_std, file_prefix)


result_abs_rgb_change_weighted = run_calculation_abs_rgb_change_weighted(SKIP_SIZE)
file_prefix = f"fsum_abs_rgb_change_weighted__skip_{SKIP_SIZE}"
json.dump(result_abs_rgb_change_weighted, open("data/{}.json".format(file_prefix), "w"))
scatterplot_it_up(result_abs_rgb_change_weighted, file_prefix)


result_abs_rgb_change_weighted_log = run_calculation_abs_rgb_change_weighted_log(SKIP_SIZE)
min_result_abs_rgb_change_weighted_log = min(result_abs_rgb_change_weighted_log)
result_abs_rgb_change_weighted_log = [x - min_result_abs_rgb_change_weighted_log for x in result_abs_rgb_change_weighted_log]

file_prefix = f"fsum_abs_rgb_change_weighted_log__skip_{SKIP_SIZE}"
json.dump(result_abs_rgb_change_weighted_log, open("data/{}.json".format(file_prefix), "w"))
scatterplot_it_up(result_abs_rgb_change_weighted_log, file_prefix)
