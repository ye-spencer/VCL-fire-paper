import json
from PIL import Image
import matplotlib.pyplot as plt

# Manually assigned each square to a group in a 9x10 grid.
# 0 = unassigned, 1 = "danger" group, 2 = "pretty" group, etc.

with open("data/chunk_group_matrix.json", "r") as f:
    CHUNK_GROUP_LIST = json.load(f)


fire_image_path = "data/fire_image.png"
try:
    img = Image.open(fire_image_path)
    plt.imshow(img)
    # Draw grid lines for a 9x10 grid
    nrows, ncols = 9, 10
    width, height = img.size
    for row in range(nrows):
        for col in range(ncols):

            x0 = col * width / ncols
            y0 = row * height / nrows
            x1 = (col + 1) * width / ncols
            y1 = (row + 1) * height / nrows

            if CHUNK_GROUP_LIST[row][col] == 0:
                fill = True
                color = 'blue'
            elif CHUNK_GROUP_LIST[row][col] == 1:
                fill = True
                color = 'green'
            elif CHUNK_GROUP_LIST[row][col] == 2:
                fill = True
                color = 'orange'
            elif CHUNK_GROUP_LIST[row][col] == 3:
                fill = True
                color = 'red'
            else:
                fill = False
                color = 'white'

            plt.gca().add_patch(
                plt.Rectangle(
                    (x0, y0),
                    x1 - x0,
                    y1 - y0,
                    fill=fill,
                    color=color,
                    alpha=0.5,
                    linewidth=1
                )
            )


    import matplotlib.patches as mpatches

    legend_labels = [
        ("green", "High on Scale : Expected (On Fire)"),
        ("orange", "High on Scale : Unexpected (Not On Fire)"),
        ("blue", "Low on Scale : Expected (Not On Fire)"),
        ("red", "Low on Scale : Unexpected (On Fire)"),
    ]

    legend_patches = []
    used_colors = {"green", "orange", "blue", "red"}
    for color, label in legend_labels:
        if color in used_colors:
            legend_patches.append(mpatches.Patch(color=color, label=label, alpha=0.7))

    # Position legend outside the plot area
    plt.legend(
        handles=legend_patches, 
        title="Chunk Group", 
        loc="center left", 
        bbox_to_anchor=(1.05, 0.5),  # Position to the right of the plot
        framealpha=0.9, 
        fontsize='small', 
        title_fontsize='small'
    )
    plt.axis('off')
    plt.title("Fire Image")
    plt.tight_layout()  # Adjust layout to accommodate the legend
    plt.savefig(f'outputs/fire_image_with_overlay_squares.png', bbox_inches='tight')
except FileNotFoundError:
    print(f"Image not found at {fire_image_path}")


CHUNK_GROUP_LIST = [item for row in CHUNK_GROUP_LIST for item in row]
with open("data/chunk_group_list.json", "w") as f:
    json.dump(CHUNK_GROUP_LIST, f)

