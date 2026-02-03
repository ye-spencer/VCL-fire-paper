import json
from PIL import Image
import matplotlib.pyplot as plt
import cv2
import numpy as np

# Manually assigned each square to a group in a 9x10 grid.
# 0 = unassigned, 1 = "danger" group, 2 = "pretty" group, etc.

with open("data/chunk_group_matrix.json", "r") as f:
    CHUNK_GROUP_LIST = json.load(f)


# Video path - using the available video file
video_path = "data/fire0.mp4"

def draw_overlay_squares(frame, chunk_group_list, frame_idx, fps):
    """Draw colored overlay squares on the frame"""
    height, width = frame.shape[:2]
    nrows, ncols = 9, 10
    
    # Convert frame to RGB for matplotlib
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Create figure and axis
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.imshow(frame_rgb)
    
    # Draw grid squares with colors
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

            ax.add_patch(
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
    
    # Add legend
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

    ax.legend(
        handles=legend_patches, 
        title="Chunk Group", 
        loc="center left", 
        bbox_to_anchor=(1.05, 0.5),
        framealpha=0.9, 
        fontsize='small', 
        title_fontsize='small'
    )
    ax.axis('off')
    ax.set_title(f"Fire Video Frame-by-Frame | Time: ({frame_idx/fps:02.3f}s)")
    plt.tight_layout()
    
    return fig

def display_frame_with_overlay(frame, frame_idx, total_frames, fps):
    """Display a single frame with overlay squares"""
    fig = draw_overlay_squares(frame, CHUNK_GROUP_LIST, frame_idx, fps)
    fig.canvas.draw()
    
    # Get the image data using buffer_rgba() which is more widely supported
    buf = fig.canvas.buffer_rgba()
    img_array = np.asarray(buf)
    # Convert RGBA to RGB
    img_array = img_array[:, :, :3]
    
    # Convert RGB to BGR for OpenCV
    img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    
    # Resize for display if too large
    height, width = img_bgr.shape[:2]
    if width > 1200:
        scale = 1200 / width
        new_width = int(width * scale)
        new_height = int(height * scale)
        img_bgr = cv2.resize(img_bgr, (new_width, new_height))
        height, width = new_height, new_width
    
    # Display the frame
    cv2.imshow('Fire Video Frame-by-Frame', img_bgr)
    
    # Close matplotlib figure to free memory
    plt.close(fig)
    
    return img_bgr

try:
    # Open video file
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
    else:
        print("Video opened successfully!")
        print("Controls:")
        print("  Right Arrow: Next frame")
        print("  Left Arrow: Previous frame") 
        print("  Q: Quit")
        
        # Get video properties
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = frame_count / fps
        
        print(f"Video info: {frame_count} frames, {fps} FPS, {duration:.2f} seconds")
        
        current_frame = 0
        
        # Load first frame
        cap.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
        ret, frame = cap.read()
        
        if ret:
            display_frame_with_overlay(frame, current_frame, frame_count, fps)
        
        while True:
            key = cv2.waitKey(0) & 0xFF
            
            if key == ord('q'):  # Q or Escape to quit
                break
            elif key == ord('d') or key == ord(' '):  # D key or Space - next frame
                current_frame = min(current_frame + 3, frame_count - 1) # Currently go 0.125s at a time
                cap.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
                ret, frame = cap.read()
                if ret:
                    display_frame_with_overlay(frame, current_frame, frame_count, fps)
        
        cap.release()
        cv2.destroyAllWindows()
        
except FileNotFoundError:
    print(f"Video file not found at {video_path}")
except Exception as e:
    print(f"Error processing video: {e}")


CHUNK_GROUP_LIST = [item for row in CHUNK_GROUP_LIST for item in row]
with open("data/chunk_group_list.json", "w") as f:
    json.dump(CHUNK_GROUP_LIST, f)