# VersaNet - Network Management Solution

VersaNet integrates several key network management tools into a single device using a Raspberry Pi cluster, designed to enhance the security, utility, and efficiency of home networks.

![VersaNet Overview](home.png)

## Project Introduction

VersaNet simplifies the management of home networks, making advanced network functionalities accessible to users with varying technical skills. This guide provides detailed instructions for setting up VersaNet, including hardware and software requirements, installation steps, and usage of each component.

## Installation Guide

### Hardware Requirements

- **Raspberry Pis**: Multiple models (3B+, 4 recommended).
- **MicroSD Cards**: 8 GB or more, class 10.
- **Power Adapters**: Suitable for each Raspberry Pi.
- **Network Equipment**: Cables, router or switch as needed.

### Software Requirements

- **Raspbian OS**: Latest version.
- **Apache Server**: To serve the web interface.
- **Pi-Hole**: For ad-blocking.
- **OpenMediaVault**: For setting up NAS.
- **Plex Media Server**: To organize and access media.
- **Speedtest by Ookla**: For monitoring network speeds.

### Installation Steps

1. **Raspberry Pi Configuration**:
   - Flash Raspbian using Raspberry Pi Imager.
   - Setup network and power connections.

2. **Software Installation**:
   - **Apache**:
     ```bash
     sudo apt update
     sudo apt install apache2 -y
     ```
   - **Pi-Hole**:
     ```bash
     curl -sSL https://install.pi-hole.net | bash
     ```
   - **OpenMediaVault**:
     ```bash
     sudo apt install openmediavault -y
     omv-setup
     ```
   - **Plex Media Server**:
     ```bash
     curl https://downloads.plex.tv/plex-keys/PlexSign.key | sudo apt-key add -
     echo deb https://downloads.plex.tv/repo/deb/ public main | sudo tee /etc/apt/sources.list.d/plexmediaserver.list
     sudo apt update
     sudo apt install plexmediaserver -y
     ```
   - **Speedtest**:
     ```bash
     sudo apt install speedtest-cli -y
     speedtest-cli
     ```

## Configuration and Optimization

Discuss how to configure each software component post-installation to optimize performance and security.

## Tool Descriptions

Detail the purpose and functionality of each tool involved in the VersaNet setup.

### Persistent Services

VersaNet utilizes several persistent services to monitor and manage network health and performance continuously:

- **Internet Connection Checker**:
  - Monitors the internet connection status.
- **ARP Scan Checker**:
  - Regularly scans the network to identify all devices connected and their IP addresses.
- **Speedtest Service**:
  - Periodically checks the network speed and logs the results for performance monitoring.

These services are essential for maintaining the reliability and security of the network. They are located in the `/etc/systemd/system` directory for persistence and autostart capabilities.

### Installation of Services

1. **Move all files except the 'services' folder to `/var/www/html`**:
   - Ensures that the web interface operates correctly.
2. **Move the 'services' folder content to `/etc/systemd/system`**:
   - Allows services to be managed by systemd and start at boot.

```bash
sudo mv /path/to/downloaded/VersaNet/services/* /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable servicename.service
sudo systemctl start servicename.service

```
Replace servicename.service with the actual service file names.


## Troubleshooting and FAQs

Q: What to do if the web interface is not loading?
A: Ensure Apache is running and files are correctly placed in /var/www/html. Restart Apache if necessary:
bash

``` sudo systemctl restart apache2 ```

Q: How can I check if Pi-Hole is blocking ads as expected?
A: Access the Pi-Hole admin dashboard through your browser by navigating to http://<your-pi-ip>/admin to view the dashboard and stats.

Q: My network speed seems slow. How can I verify network performance?
A: Run speedtest-cli to check the current network speed. Check for any significant drops and verify if other services are 
consuming bandwidth.

Q: How to ensure all persistent services are running?
A: Check the status of each service using:

``` sudo systemctl status servicename.service ```
Replace servicename with the name of the service you want to check.

Q: Plex Media Server isn't accessible from my network. What should I check?
A: Verify that Plex is running and not blocked by your firewall. Ensure the network settings in Plex are configured to allow access from your network.



