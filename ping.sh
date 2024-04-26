#!/bin/bash
while true; do
    ping -c 1 8.8.8.8 > /var/www/html/ping_result.txt
    sleep 5
done
