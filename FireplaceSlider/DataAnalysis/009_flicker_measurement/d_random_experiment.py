import json
import pandas as pd
import numpy as np

with open('data/flickerness_sum_luminous_std.json', 'r') as file:
    flickerness_sum_luminous_std = json.load(file)
    # convert to unit
    max_flickerness = max(flickerness_sum_luminous_std)
    flickerness_sum_luminous_std = [v / max_flickerness for v in flickerness_sum_luminous_std]
    

with open('data/flickerness_sum_abs_rgb_change.json', 'r') as file:
    flickerness_sum_abs_rgb_change = json.load(file)
    # convert to unit
    max_flickerness = max(flickerness_sum_abs_rgb_change)
    flickerness_sum_abs_rgb_change = [v / max_flickerness for v in flickerness_sum_abs_rgb_change]

with open('data/flickerness_sum_luminous.json', 'r') as file:
    flickerness_sum_luminous_change = json.load(file)
    # convert to unit
    max_flickerness = max(flickerness_sum_luminous_change)
    flickerness_sum_luminous_change = [v / max_flickerness for v in flickerness_sum_luminous_change]

df_pd = pd.read_csv('data/averaged_data.csv')

df_pd_grouped = df_pd.groupby(['word_one', 'chunk_number'])["averaged_value"].mean()

dangerous_scores = df_pd_grouped.loc['Less Good for Danger Signal'].sort_index()
pretty_scores = df_pd_grouped.loc["Less Pretty Stone"].sort_index()


for p_index in range(0, 100, 1):
    p = p_index / 100
    combined = [
        p * flickerness_sum_luminous_std[i] + (1 - p) * flickerness_sum_abs_rgb_change[i] for i in range(len(flickerness_sum_luminous_std))
    ]
    
    dangerous_correlation = np.corrcoef(combined, dangerous_scores)[0,1]
    pretty_correlation = np.corrcoef(combined, pretty_scores)[0,1]
    print(f"{p_index}\t{dangerous_correlation}\t{pretty_correlation}")