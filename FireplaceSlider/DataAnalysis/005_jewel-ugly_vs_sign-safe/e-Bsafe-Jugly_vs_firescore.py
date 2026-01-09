import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

averaged_pd_data = pd.read_csv('data/averaged_data.csv')
averaged_fire_data = pd.read_csv('data/averaged_fire_data.csv')

### Calculate Average Firescores ###
average_fire_scores = averaged_fire_data.groupby('chunk_number')['averaged_value'].mean()
print(average_fire_scores)


ugly_slopes = []
safe_slopes = []


for user_id in averaged_pd_data["prolific_id"].unique():
    user_data = averaged_pd_data[averaged_pd_data["prolific_id"] == user_id]

    user_rating = None

    assert len(user_data) == 90

    fire_values = []
    user_values = []

    for chunk in range(0, 90):
        chunk_data = user_data[user_data["chunk_number"] == chunk]
        assert len(chunk_data) == 1

        if user_rating:
            assert user_rating == chunk_data["word_one"].values[0]
        else:
            user_rating = chunk_data["word_one"].values[0]

        user_average_score = chunk_data["averaged_value"].values[0]
        fire_score = average_fire_scores.iloc[int(chunk)]

        fire_values.append(fire_score)
        user_values.append(user_average_score)
    
    slope, intercept = np.polyfit(fire_values, user_values, 1)

    print(f"\nSlope: {slope}, Intercept: {intercept}")
    print(user_rating)

    if user_rating == "Less Good for Safe Signal":
        safe_slopes.append(slope)
    elif user_rating == "Less Good for Background":
        ugly_slopes.append(slope)

print(len(safe_slopes))
print(len(ugly_slopes))

BINS = 15

plt.figure(figsize=(12, 6))
plt.hist(ugly_slopes, bins=BINS, alpha=0.8, label='Jeweler-Pendant-Good-Background Slopes', color='blue')
plt.xlim(-1.5, 1.5)
plt.xlabel('Slope Value')
plt.ylabel('Frequency')
plt.title('Distribution of Slopes for Jeweler-Pendant-Good-Background Ratings')
plt.legend()

plt.savefig('outputs/Jeweler-Pendant-Good-Background_slope_distribution.png')

plt.figure(figsize=(12, 6))
plt.xlim(-1.5, 1.5)
plt.hist(safe_slopes, bins=BINS, alpha=0.8, label='Burner-Safe-Sign Slopes', color='red')
plt.xlabel('Slope Value')
plt.ylabel('Frequency')
plt.title('Distribution of Slopes for Burner-Safe-Sign Ratings')
plt.legend()

plt.savefig('outputs/Burner-Safe-Sign_slope_distribution.png')





