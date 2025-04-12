#!/bin/bash

# Simple deployment script for the portfolio website
# This script can be modified based on your chosen hosting provider

echo "Deploying portfolio website..."

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null
then
    echo "Netlify CLI not found. Would you like to install it? (y/n)"
    read install_netlify
    
    if [ "$install_netlify" = "y" ]; then
        echo "Installing Netlify CLI..."
        npm install -g netlify-cli
    else
        echo "Aborting deployment. Please install a deployment tool or deploy manually."
        exit 1
    fi
fi

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy

echo "Deployment completed!"
exit 0 