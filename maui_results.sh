
#!/bin/bash

# Check if the script is being run with sudo
if [ "$EUID" -ne 0 ]; then
    echo "[$(date)] Please run this script with sudo."
    exit
fi

# Firebase Realtime Database URL
FIREBASE_DATABASE_URL="https://maui-d3f73-default-rtdb.europe-west1.firebasedatabase.app/.json"

# Function to run speedtest and save results
run_speedtest() {
    speedtest_output=$(speedtest-cli --simple)
    download_speed=$(echo "$speedtest_output" | awk '/Download/ {print $2}')
    upload_speed=$(echo "$speedtest_output" | awk '/Upload/ {print $2}')
    ping_speed=$(echo "$speedtest_output" | awk '/Ping/ {print $2}')

    echo "[$(date)] Debug: Download=$download_speed | Upload=$upload_speed | Ping=$ping_speed"

    # Overwrite previous results in speedtest_results.txt
    echo "[$(date)] Download: $download_speed | Upload: $upload_speed | Ping: $ping_speed" > /var/www/html/maui_speedtest_results.txt
    echo "[$(date)] Speedtest results written to /var/www/html/maui_speedtest_results.txt"

    # Send results to Firebase Realtime Database
    send_to_firebase "$download_speed" "$upload_speed" "$ping_speed"
}

# Function to send results to Firebase Realtime Database
send_to_firebase() {
    local download_speed=$1
    local upload_speed=$2
    local ping_speed=$3

    # Format timestamp using Python
    local timestamp=$(python3 -c "from datetime import datetime, timezone; print(datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z')")

    # Create JSON payload
    json_payload="{\"timestamp\": \"$timestamp\", \"download_speed\": \"$download_speed\", \"upload_speed\": \"$upload_speed\", \"ping_speed\": \"$ping_speed\"}"

    # Send data to Firebase Realtime Database using curl
    curl -X POST -d "$json_payload" "$FIREBASE_DATABASE_URL" > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "[$(date)] Speed test results sent to Firebase."
    else
        echo "[$(date)] Failed to send speed test results to Firebase."
    fi
}

# Run speedtest once at the beginning
run_speedtest

# Run speedtest every 30 seconds in the background
while true; do
    run_speedtest
    echo "[$(date)] Speedtest completed. Waiting for 15 minutes until the next run."
    sleep 900  # 15 minutes
done
