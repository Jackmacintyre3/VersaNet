
#!/bin/bash

# Check if the script is being run with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script with sudo."
    exit
fi

# Function to run speedtest and save results
run_speedtest() {
    speedtest_output=$(speedtest-cli --simple)
    download_speed=$(echo "$speedtest_output" | awk '/Download/ {print $2}')
    upload_speed=$(echo "$speedtest_output" | awk '/Upload/ {print $2}')
    echo "Download: $download_speed" > speedtest_results.txt
    echo "Upload: $upload_speed" >> speedtest_results.txt
}

# Run speedtest once at the beginning
run_speedtest

# Run speedtest every 30 seconds in the background
while true; do
    run_speedtest
    sleep 30
done
