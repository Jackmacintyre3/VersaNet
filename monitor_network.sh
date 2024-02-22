
#!/bin/bash

# Check if the script is being run with sudo
if [ "$EUID" -ne 0 ]; then
    echo "[$(date)] Please run this script with sudo."
    exit
fi

# Function to run speedtest and save results
run_speedtest() {
    speedtest_output=$(speedtest-cli --simple)
    download_speed=$(echo "$speedtest_output" | awk '/Download/ {print $2}')
    upload_speed=$(echo "$speedtest_output" | awk '/Upload/ {print $2}')
    ping_speed=$(echo "$speedtest_output" | awk '/Ping/ {print $2}')

    echo "[$(date)] Debug: Download=$download_speed | Upload=$upload_speed | Ping=$ping_speed"

    # Overwrite previous results in speedtest_results.txt
    echo "[$(date)] Download: $download_speed | Upload: $upload_speed | Ping: $ping_speed" > /var/www/html/speedtest_results.txt
    echo "[$(date)] Speedtest results written to /var/www/html/speedtest_results.txt"
}

# Run speedtest once at the beginning
run_speedtest

# Run speedtest every 30 seconds in the background
while true; do
    run_speedtest
    echo "[$(date)] Speedtest completed. Waiting for 30 seconds until the next run."
    sleep 30
done
