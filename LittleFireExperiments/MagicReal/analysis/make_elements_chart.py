import math
import matplotlib.pyplot as plt

data = {
    "Fire":43,
    "Air":34,
    "Water":17,
    "Rocks":6,
}

data_radius = {} 

SCALE = 0.125
RADIUS_OFFSET = 42

for key, value in data.items():
    data_radius[key] = math.sqrt(value) * SCALE


plt.figure(figsize=(10, 10))
plt.axis('equal')
plt.title("What makes magic real?")
import matplotlib.pyplot as plt

# Manually define positions for the circles so they don't overlap and are visually balanced
# This is a simple arrangement (e.g., a loose square)
positions = {
    "Fire": (-30, 10),
    "Air": (35, 5),
    "Water": (1, -32),
    "Rocks": (-28, -45),
}   

# Colors for each element
colors = {
    "Fire": "#E74C3C",
    "Air": "#CAC7CE",
    "Water": "#ABB2B9",
    "Rocks": "#BFC2C4",
}

# Draw circles and add labels
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
import matplotlib.image as mpimg

for key in data.keys():
    x, y = positions[key]
    radius = data_radius[key]
    img_path = "element_pictures/" + key.lower() + ".png"

    img = mpimg.imread(img_path)

    imagebox = OffsetImage(img, zoom=radius)
    ab = AnnotationBbox(
        imagebox, (x, y),
        frameon=False,
        box_alignment=(0.5, 0.5)
    )
    plt.gca().add_artist(ab)

    # Label at the center of the image, offset below the image
    plt.text(
        x, y - (radius * RADIUS_OFFSET), f"{key}\n{data[key]} votes",
        ha='center', va='top',
        fontsize=16, weight='bold', color='black'
    )

# Adjust plot limits to fit all circles
all_x = [pos[0] for pos in positions.values()]
all_y = [pos[1] for pos in positions.values()]
all_r = [data_radius[k] for k in positions]

plt.xlim(min(all_x) - max(all_r) - 30, max(all_x) + max(all_r) + 30)
plt.ylim(min(all_y) - max(all_r) - 30, max(all_y) + max(all_r) + 30)

plt.xticks([])
plt.yticks([])
plt.box(False)

plt.savefig("elements_chart.png", dpi=300)
plt.close()