import requests
import time
import json

def calculate_luminous(red, green, blue):
    return red * 0.2126 + green * 0.7152 + blue * 0.0722

NUM_X_POINTS = 324 
NUM_Y_POINTS = 216
NUM_CHUNKS = 90
SECONDS = 30
FPS = 24

def run_calculation(SKIP_ITERATION):

    counter = 0
    flickerness_sum = [0] * NUM_CHUNKS

    for x in range(NUM_X_POINTS):
        for y in range(NUM_Y_POINTS):
            counter += 1
            if counter % SKIP_ITERATION != 0:   
                continue

            start_time = time.time()

            bucket = 'halberdalab-fireplaceslider-firevideos'
            key = f'output_json/trial_data{x}-{y}.json'

            url = f'https://{bucket}.s3.amazonaws.com/{key}'

            response = requests.get(url)

            data = response.json()

            length = len(data["data"])
            assert length == NUM_CHUNKS

            for i in range(NUM_CHUNKS):
                n = len(data["data"][i])
                assert n == SECONDS * FPS

                for k in range(1, n):
                    total = abs(calculate_luminous(data["data"][i][k][0], data["data"][i][k][1], data["data"][i][k][2]) - calculate_luminous(data["data"][i][k-1][0], data["data"][i][k-1][1], data["data"][i][k-1][2]))
                flickerness_sum[i] += total

            print(f"{counter:05d}/{NUM_X_POINTS * NUM_Y_POINTS} | Time taken: ", time.time() - start_time)

    return flickerness_sum
