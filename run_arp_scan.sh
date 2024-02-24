
#!/bin/bash

while true; do
    # Run arp-scan and sort the output
    sudo arp-scan --localnet --interface=eth0 | sort -n -t . -k 1,1 -k 2,2 -k 3,3 -k 4,4 > /var/www/html/arp_scan_output.txt

    # Sleep for one minute
    sleep 60
done
