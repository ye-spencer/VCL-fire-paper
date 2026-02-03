import pandas as pd
import matplotlib.pyplot as plt



def generate_coverage_map(df, description, words):
    df_limit = df[df['word_one'].isin(words)]

    # Get jitters of each participant
    xy_pairs = df_limit[['x', 'y']].drop_duplicates()
    xy_coords = xy_pairs.values
    print("Number of unique xy pairs: ", len(xy_coords))



    # Calculate percentage covered
    notHitPixels = set()
    for x in range(X_SIZE): # We only grabbed from 0 to 323
        for y in range(Y_SIZE):
            notHitPixels.add((x, y))

    for coord in xy_coords:
        x, y = coord
        x = int(x)
        y = int(y)
        for x_add in range(24):
            for y_add in range(24):
                notHitPixels.discard((x + x_add, y + y_add))

    notHit = len(notHitPixels)

    percentage_covered = (1 - (notHit / (X_SIZE * Y_SIZE))) * 100

    print("Percentage covered: ", percentage_covered)


    # Graph coverage map
    plt.figure(figsize=(12, 8))
    for coord in xy_coords:
        x, y = coord
        rect = plt.Rectangle((x, y), BLOCK_SIZE, BLOCK_SIZE, color='blue', alpha=0.5)
        plt.gca().add_patch(rect)

    plt.xlim(0, X_SIZE + BLOCK_SIZE)
    plt.ylim(0, Y_SIZE + BLOCK_SIZE)
    plt.title('Coverage Map with 24x24 Pixel Circles for ' + description)
    plt.xlabel('X Coordinate')
    plt.ylabel('Y Coordinate')
    plt.grid(True)
    plt.text(X_SIZE/2, Y_SIZE + 40, f'Percentage Covered: {percentage_covered:.2f}%, Number of Jitters: {len(xy_coords)}', 
            ha='center', va='center', fontsize=12, bbox=dict(facecolor='white', alpha=0.8))
    plt.savefig('outputs/coverage_map_' + description.replace(" ", "-") + '.png')
    plt.close()

# Note, the graph is not showing the entire image, but only the first 324x216 pixels, because I typed 348 not 384


df = pd.read_csv("data/cleaned_data.csv")

X_SIZE = 360
Y_SIZE = 216
BLOCK_SIZE = 24

# Get only the rows of the trial we want
TRIALS = {
    "Jeweler Danger Coverage" : ["Less Good for Danger Signal"],
    "All" : [
        "Less Good for Danger Signal",
        "Less Pretty Stone",
        "Less Good for Background",
        "Less Good for Safe Signal",
        "Not Like Fire"
    ]
}

for description, words in TRIALS.items():
    generate_coverage_map(df, description, words)







