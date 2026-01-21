#!/bin/bash

# Variables
VPS_HOST="43.157.230.80"
VPS_USER="ubuntu"
VPS_PORT=22

echo "🚀 Deploying nginx configuration to VPS..."

# Upload nginx config
echo "📤 Uploading nginx-vps.conf..."
scp -P $VPS_PORT nginx/nginx-vps.conf $VPS_USER@$VPS_HOST:/tmp/nginx-vps.conf

# SSH to VPS and apply configuration
echo "🔧 Applying configuration on VPS..."
ssh -p $VPS_PORT $VPS_USER@$VPS_HOST << 'EOF'
    # Backup existing config if exists
    if [ -f /etc/nginx/sites-available/aether-ui ]; then
        sudo mv /etc/nginx/sites-available/aether-ui /etc/nginx/sites-available/aether-ui.backup
        echo "✅ Backed up existing configuration"
    fi

    # Move new config
    sudo mv /tmp/nginx-vps.conf /etc/nginx/sites-available/aether-ui
    echo "✅ Installed new configuration"

    # Test nginx config
    if sudo nginx -t; then
        echo "✅ Configuration test passed"
        sudo nginx -s reload
        echo "✅ Nginx reloaded successfully"
    else
        echo "❌ Configuration test failed"
        exit 1
    fi
EOF

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Access URLs:"
echo "   - http://aether.yourdomain.com"
echo "   - http://devkit.yourdomain.com"
