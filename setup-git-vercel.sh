#!/bin/bash

# Script to set up Git and deploy to Vercel

echo "Setting up Git repository and deploying to Vercel..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git and try again."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Would you like to install it? (y/n)"
    read install_vercel
    
    if [ "$install_vercel" = "y" ]; then
        echo "Installing Vercel CLI using npm..."
        npm install -g vercel
    else
        echo "Please install Vercel CLI manually and run this script again."
        exit 1
    fi
fi

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    
    # Create .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        echo "Creating .gitignore file..."
        cat > .gitignore << EOF
# System files
.DS_Store
Thumbs.db
desktop.ini

# Node modules and logs
node_modules/
npm-debug.log
yarn-error.log
.env

# Vercel
.vercel/

# IDE files
.vscode/
.idea/
*.sublime-*
EOF
    fi
    
    # Add all files to Git
    echo "Adding files to Git repository..."
    git add .
    
    # Create first commit
    echo "Creating initial commit..."
    git commit -m "Initial commit"
else
    echo "Git repository already initialized."
    
    # Add all files to Git
    echo "Adding files to Git repository..."
    git add .
    
    # Create commit
    echo "Creating commit..."
    git commit -m "Update website"
fi

# Ask for GitHub repository details
echo "Would you like to connect to a GitHub repository? (y/n)"
read connect_github

if [ "$connect_github" = "y" ]; then
    echo "Enter your GitHub username:"
    read github_username
    
    echo "Enter the name for your repository (e.g., portfolio-website):"
    read repo_name
    
    # Check if remote origin already exists
    if git remote | grep -q "origin"; then
        echo "Remote 'origin' already exists. Would you like to replace it? (y/n)"
        read replace_origin
        
        if [ "$replace_origin" = "y" ]; then
            git remote remove origin
            git remote add origin "https://github.com/$github_username/$repo_name.git"
        fi
    else
        git remote add origin "https://github.com/$github_username/$repo_name.git"
    fi
    
    echo "Would you like to create this repository on GitHub now? (y/n)"
    echo "Note: You'll need to create it manually if you answer 'n'."
    read create_repo
    
    if [ "$create_repo" = "y" ]; then
        echo "You'll need to create the repository on GitHub manually."
        echo "Visit: https://github.com/new"
        echo "Repository name: $repo_name"
        echo "Press Enter when you've created the repository on GitHub..."
        read
    fi
    
    echo "Pushing to GitHub..."
    git push -u origin main || git push -u origin master
fi

# Deploy to Vercel
echo "Would you like to deploy to Vercel now? (y/n)"
read deploy_vercel

if [ "$deploy_vercel" = "y" ]; then
    echo "Logging in to Vercel..."
    vercel login
    
    echo "Deploying to Vercel..."
    vercel
    
    echo "Would you like to set up your custom domain (davidepedone.com) with Vercel? (y/n)"
    read setup_domain
    
    if [ "$setup_domain" = "y" ]; then
        echo "Adding domain to your Vercel project..."
        vercel domains add davidepedone.com
        
        echo "Please update your domain's DNS settings according to Vercel's instructions."
        echo "This typically involves adding an A record or CNAME record pointing to Vercel's servers."
    fi
fi

echo "Setup completed!"
exit 0 