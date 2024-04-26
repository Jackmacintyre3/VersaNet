#!/bin/bash
while true; do
    sudo arp-scan --localnet --interface=eth0 | sort -n -t . -k 1,1 -k 2,2 -k 3,3 -k 4,4 > /var/www/html/arp_scan_output.txt
    sleep 60
done
