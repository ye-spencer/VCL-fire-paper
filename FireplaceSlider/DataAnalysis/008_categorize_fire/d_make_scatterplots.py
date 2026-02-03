import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
import matplotlib.patches as mpatches
from collections import Counter

df_pd = pd.read_csv('data/averaged_data.csv')

with open("data/chunk_group_list.json", "r") as f:
    CHUNK_GROUP_LIST = json.load(f)


COLOR_LIST = ["blue", "green", "orange", "red"] # TN, TP, FP, FN
COLORS = [COLOR_LIST[CHUNK_GROUP_LIST[i]] for i in range(len(CHUNK_GROUP_LIST))]

# Count the number of each color
color_counts = Counter(COLORS)
for color in COLOR_LIST:
    print(f"{color}: {color_counts[color]}")


df_pd_grouped = df_pd.groupby(['word_one', 'chunk_number'])["averaged_value"].mean()


dangerous_scores = df_pd_grouped.loc['Less Good for Danger Signal'].sort_index()
pretty_scores = df_pd_grouped.loc["Less Pretty Stone"].sort_index()


plt.figure(figsize=(10, 6))
plt.scatter(dangerous_scores, pretty_scores, alpha=0.9, c=COLORS)


plt.xlabel('Sign Dangerous Score')
plt.ylabel('Jeweler Pretty Score') 
plt.title('Sign Dangerous vs Jeweler Pretty Scores')

plt.xlim(0, 1)
plt.ylim(0, 1)

z = np.polyfit(dangerous_scores, pretty_scores, 1)
p = np.poly1d(z)
plt.plot(dangerous_scores, p(dangerous_scores), "r--", alpha=0.8)

plt.plot([0.35, 0.55], [0.65, 0.325], linestyle='dashed', color='black', linewidth=2, alpha=0.7)


# Calculate correlation coefficient
correlation = np.corrcoef(dangerous_scores, pretty_scores)[0,1]

# Add stats text to plot
stats_text = f'Correlation: {correlation:.3f}\nSlope: {z[0]:.3f}\nIntercept: {z[1]:.3f}'
plt.text(0.05, 0.95, stats_text, transform=plt.gca().transAxes, 
         verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

# Define legend labels to match the color coding
legend_labels = [
    ("green", "High on Scale : Expected (On Fire)" + f" ({color_counts['green']})"),
    ("orange", "High on Scale : Unexpected (Not On Fire)" + f" ({color_counts['orange']})"),
    ("blue", "Low on Scale : Expected (Not On Fire)" + f" ({color_counts['blue']})"),
    ("red", "Low on Scale : Unexpected (On Fire)" + f" ({color_counts['red']})"),
]

# Remove duplicate colors/labels if needed, and only show those present in the plot
used_colors = set(COLORS)
legend_patches = []
for color, label in legend_labels:
    if color in used_colors:
        legend_patches.append(mpatches.Patch(color=color, label=label, alpha=0.7))

plt.legend(handles=legend_patches, title="Chunk Group", loc="lower left", framealpha=0.9, fontsize='small', title_fontsize='small')


plt.savefig(f'outputs/sign_dangerous_vs_jeweler_pretty_scores_colored.png')

