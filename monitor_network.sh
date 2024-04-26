#!/bin/bash
if [ "$EUID" -ne 0 ]; then
    echo "[$(date)] Please run this script with sudo."
    exit
fi

run_speedtest() {
    speedtest_output=$(speedtest-cli --simple)
    download_speed=$(echo "$speedtest_output" | awk '/Download/ {print $2}')
    upload_speed=$(echo "$speedtest_output" | awk '/Upload/ {print $2}')
    ping_speed=$(echo "$speedtest_output" | awk '/Ping/ {print $2}')

    echo "[$(date)] Debug: Download=$download_speed | Upload=$upload_speed | Ping=$ping_speed"

    echo "[$(date)] Download: $download_speed | Upload: $upload_speed | Ping: $ping_speed" > /var/www/html/speedtest_results.txt
    echo "[$(date)] Speedtest results written to /var/www/html/speedtest_results.txt"
}

run_speedtest

while true; do
    run_speedtest
    echo "[$(date)] Speedtest completed. Waiting for 30 seconds until the next run."
    sleep 30
done
