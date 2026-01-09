import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df_pd = pd.read_csv('data/averaged_data.csv')



df_pd_grouped = df_pd.groupby(['word_one', 'chunk_number'])["averaged_value"].mean()


safe_scores = df_pd_grouped.loc["Less Good for Safe Signal"].sort_index()

ugly_scores = df_pd_grouped.loc["Less Good for Background"].sort_index()

plt.figure(figsize=(10, 6))
plt.scatter(safe_scores, ugly_scores, alpha=0.5)


plt.xlabel('Burner Safe Score')
plt.ylabel('Pendant Background Score') 
plt.title('Burner Safe Score vs Pendant Background Score')

plt.xlim(0, 1)
plt.ylim(0, 1)

z = np.polyfit(safe_scores, ugly_scores, 1)
p = np.poly1d(z)
plt.plot(safe_scores, p(safe_scores), "r--", alpha=0.8)

# Calculate correlation coefficient
correlation = np.corrcoef(safe_scores, ugly_scores)[0,1]

# Add stats text to plot
stats_text = f'Correlation: {correlation:.3f}\nSlope: {z[0]:.3f}\nIntercept: {z[1]:.3f}'
plt.text(0.05, 0.95, stats_text, transform=plt.gca().transAxes, 
         verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

plt.savefig(f'outputs/burner-safe_vs_jeweler_pendant-background-ugly.png')

