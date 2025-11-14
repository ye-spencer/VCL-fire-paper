import matplotlib.pyplot as plt 
import pandas as pd
import numpy as np

info = {
    "_ like to cook on a fire" : {
        "human" : 80.95,
        "animal" : 3.76,
    },
    "_ can make a fire" : {
        "human" : 94.93,
        "animal" : 7.03,
    },
    "_ feel that a small or medium fire is pretty" : {
        "human" : 77.58,
        "animal" : 23.17,
    },
    "_ like to look at fire" : {
        "human" : 77.10,
        "animal" : 31.20,
    },
    "_ like the warmth of a medium fire" : {
        "human" : 87.76,
        "animal" : 62.48,
    },
    "_ are afraid of a big fire" : {
        "human" : 83.25,
        "animal" : 90.30,
    },
}


labels = list(info.keys())
human_vals = [info[key]["human"] for key in labels]
animal_vals = [info[key]["animal"] for key in labels]

y = np.arange(len(labels))
bar_width = 0.35

plt.figure(figsize=(12, 6))
bars1 = plt.barh(y + bar_width/2, animal_vals, height=bar_width, color="#C0504D", label="Animal", edgecolor='black')
bars2 = plt.barh(y - bar_width/2, human_vals, height=bar_width, color="#4F81BD", label="Human", edgecolor='black')


plt.yticks(y, labels, fontsize=12)
plt.xlabel('Score (0 is totally disagree, 100 is totally agree)', fontsize=13)
plt.title("Interpreted Perception of Fire between Humans and Animals", fontsize=15, weight='bold', pad=12)
plt.legend(frameon=True, fontsize=12)
plt.grid(axis='x', linestyle='--', alpha=0.5)

# Add value labels to bars
for bars, vals in zip([bars1, bars2], [animal_vals, human_vals]):
    for bar, val in zip(bars, vals):
        plt.text(val + 0.2, bar.get_y() + bar.get_height()/2, f"{val:.1f}", va='center', ha='left', fontsize=11)

plt.tight_layout()
plt.savefig("fire_comparison.png", dpi=300)
plt.close()