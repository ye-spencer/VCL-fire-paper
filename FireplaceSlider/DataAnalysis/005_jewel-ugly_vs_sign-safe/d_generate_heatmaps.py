import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df_pd = pd.read_csv('data/averaged_data.csv')


df_pd_grouped = df_pd.groupby(['word_one', 'chunk_number'])["averaged_value"].mean()


safe_scores = df_pd_grouped.loc["Less Good for Safe Signal"].sort_index()
ugly_scores = df_pd_grouped.loc["Less Good for Background"].sort_index()

safe_scores_grid = np.array(safe_scores).reshape(10, 9).T
ugly_scores_grid = np.array(ugly_scores).reshape(10, 9).T


# Create heatmap for dangerous scores
plt.figure(figsize=(10, 6))
plt.imshow(safe_scores_grid, cmap='YlOrRd', aspect='equal')
plt.colorbar(label='Burner Safe Score')
plt.title('Burner Safe Score by Chunk')
plt.savefig(f'outputs/burner_safe_scores_by_chunk.png')

# Create a heatmap of pretty scores
plt.figure(figsize=(10, 6))
plt.imshow(ugly_scores_grid, cmap='YlOrRd', aspect='equal')
plt.colorbar(label='Jeweler Good Background Score')
plt.title('Jeweler Good Background by Chunk')
plt.savefig(f'outputs/jeweler_good_background_scores_by_chunk.png')