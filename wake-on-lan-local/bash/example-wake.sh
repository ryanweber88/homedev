#!/bin/bash

# Note: This script requires the 'etherwake' package to be installed.

# Check if a desktop name is provided
if [[ $# -eq 0 || -z "$1" ]]; then
    echo "Usage: wake <pc_name || all>"
    exit 1
fi

# Assign the first argument to a variable
PC=$1

# Create an associative array to hold MAC addresses of PCs
declare -A pc_map
pc_map["DESKTOP-EXAMPLE"]="00:00:00:00:00:00"

# Check if the key exists in the map
if [[ -v pc_map["$PC"] ]]; then
    # Wake the PC
    echo "Waking up $PC ..."
    sudo etherwake ${pc_map[$PC]}
elif [[ "$PC" == "all" ]]; then
    # Wake all PCs defined
    for key in "${!pc_map[@]}"; do
        echo "Waking up $key ..."
        sudo etherwake ${pc_map[$key]}
    done
else
    echo "PC '$PC' not found."
fi