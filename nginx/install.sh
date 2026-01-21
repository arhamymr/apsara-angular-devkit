#!/bin/bash

echo "🚀 Setting up Nginx on this server..."

# 1. Install Nginx if missing
if ! command -v nginx >/dev/null 2>&1; then
    echo "📦 Nginx not found. Installing..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

# 2. Check for Port 80 Conflict (Docker)
if sudo ss -ltnp | grep -q ":80 "; then
    echo "⚠️  WARNING: Port 80 is already in use!"
    PROCESS=$(sudo ss -ltnp | grep ":80 " | awk '{print $6}')
    echo "   Process: $PROCESS"
    if echo "$PROCESS" | grep -q "docker"; then
        echo "   🔴 Docker is hogging port 80. Nginx cannot start."
        echo "   Please stop the container binding port 80:"
        echo "     docker ps --format '{{.ID}} {{.Ports}} {{.Names}}' | grep ':80->'"
        echo "   Then restart it on a different port (e.g., -p 3000:3000)."
        echo "   Example fix: docker rm -f apsara-devkit-web && docker run -d -p 3000:3000 --name apsara-devkit-web ..."
    fi
fi

# 3. Apply Configuration
echo "🔧 Applying Nginx configuration..."
SCRIPT_DIR=$(dirname "$0")
CONFIG_FILE="$SCRIPT_DIR/nginx-vps.conf"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: Could not find nginx-vps.conf in $SCRIPT_DIR"
    exit 1
fi

# Backup existing
if [ -f /etc/nginx/sites-available/aether-ui ]; then
    sudo cp /etc/nginx/sites-available/aether-ui /etc/nginx/sites-available/aether-ui.backup
    echo "✅ Backed up existing configuration"
fi

# Copy new config
sudo cp "$CONFIG_FILE" /etc/nginx/sites-available/aether-ui
echo "✅ Installed new configuration"

# Symlink
if [ ! -L /etc/nginx/sites-enabled/aether-ui ]; then
    sudo ln -sf /etc/nginx/sites-available/aether-ui /etc/nginx/sites-enabled/aether-ui
    echo "✅ Linked sites-enabled/aether-ui"
fi

# Test and Reload
if sudo nginx -t; then
    echo "✅ Configuration test passed"
    if command -v systemctl >/dev/null 2>&1; then
        sudo systemctl reload nginx
    else
        sudo nginx -s reload
    fi
    echo "✅ Nginx reloaded successfully"
else
    echo "❌ Configuration test failed"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
