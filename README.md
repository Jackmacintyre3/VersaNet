![Home Page Screenshot](home.png)

# VersaNet
VersaNet is a device designed to enhance the security, utility, and efficiency of home networks using a Raspberry Pi cluster. This README includes a full installation guide, detailed descriptions of each component, and the tools used in the project.

## Project Introduction

VersaNet integrates several key network management tools into a single device, enabling users of all technical skill levels to manage and optimize their home networks. It aims to improve network storage, security, and connectivity through user-friendly solutions.

## Installation Guide

### Hardware Requirements

- **Raspberry Pi Models**: Raspberry Pi 3B+ or newer models recommended.
- **MicroSD Cards**: Minimum 8 GB, class 10 for optimal performance.
- **Power Supply**: Appropriate power supply for each Raspberry Pi.
- **Network Cables and Router**: For connecting your Pis to the network.

### Software Requirements

- **Raspbian OS**: Install the latest version of Raspbian on each Raspberry Pi.
- **Apache Server**: For hosting the web interface.
- **Pi-Hole**: Network-wide ad blocking.
- **OpenMediaVault**: For NAS functionality.
- **Plex Media Server**: For media management across the network.
- **Speedtest**: For monitoring network speed.

### Step-by-Step Setup

1. **Raspberry Pi Setup**:
   - Flash Raspbian OS onto the MicroSD cards using Raspberry Pi Imager.
   - Insert the MicroSD cards into each Raspberry Pi and connect them to power and network.
   
2. **Software Installation**:
   - **Apache Setup**: Install Apache on the master Pi to host your web interface.
     ```bash
     sudo apt update
     sudo apt install apache2 -y
     ```
   - **Pi-Hole Installation**: Install Pi-Hole to handle network-wide ad blocking.
     ```bash
     curl -sSL https://install.pi-hole.net | bash
     ```
   - **OpenMediaVault Setup**: Set up NAS functionalities.
     ```bash
     sudo apt install openmediavault -y
     omv-setup
     ```
   - **Plex Media Server**: For organizing and accessing media content.
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

3. **Configuration and Optimization**:
   - Configure each tool following the installation prompts.
   - Optimize the settings for security, storage management, and network performance.

## Tool Descriptions

- **Apache**: Serves the web interface for managing VersaNet functionalities.
- **Pi-Hole**: Blocks unwanted advertisements across the network, enhancing speed and security.
- **OpenMediaVault**: Manages your digital storage needs, accessible over the network.
- **Plex**: Organizes and streams your media content across devices.
- **Speedtest**: Monitors and logs network speed to ensure optimal performance.

## File Descriptions

- `index.html`: The homepage for the VersaNet web interface.
- `setup.sh`: Script for initial setup and configuration of network management tools.
- `config.py`: Contains configuration parameters for network tools.

## Troubleshooting and FAQs

- **Common Issues**:
  - **Network connectivity**: Ensure all Raspberry Pis are correctly connected to your router.
  - **Software errors**: Check the logs for each service in `/var/log/`.
  
## Further Development

- Suggestions for project enhancements include adding IoT device management capabilities.
- Community contributions are welcome to extend VersaNet's functionalities.

## Conclusion

VersaNet aims to provide a robust, user-friendly network management solution. By following this guide, users can set up a comprehensive home network management system that enhances their digital security and utility.
