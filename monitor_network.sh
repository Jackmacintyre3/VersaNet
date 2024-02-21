#!/bin/bash

# Run speedtest and extract upload and download speeds
speedtest_output=$(speedtest-cli --simple)

# Extract download and upload speeds from the output
download_speed=$(echo "$speedtest_output" | awk '/Download/ {print $2}')
upload_speed=$(echo "$speedtest_output" | awk '/Upload/ {print $2}')

# Save download and upload speeds to a text file
echo "Download: $download_speed" > speedtest_results.txt
echo "Upload: $upload_speed" >> speedtest_results.txt
