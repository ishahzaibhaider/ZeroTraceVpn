#!/bin/bash
# Create placeholder assets for Expo app

# Colors (using your theme color #0c64e0 which is RGB(12, 100, 224))
# For now, create simple colored squares

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
    # Create icon.png (1024x1024)
    convert -size 1024x1024 xc:"#0c64e0" assets/icon.png
    
    # Create splash.png (1242x2436 for iPhone)
    convert -size 1242x2436 xc:"#0c64e0" assets/splash.png
    
    # Create adaptive-icon.png (1024x1024)
    convert -size 1024x1024 xc:"#0c64e0" assets/adaptive-icon.png
    
    # Create favicon.png (48x48)
    convert -size 48x48 xc:"#0c64e0" assets/favicon.png
    
    echo "✅ Created placeholder assets using ImageMagick"
elif command -v sips &> /dev/null; then
    # macOS sips can't create from scratch, so we'll create a different way
    echo "Using alternative method..."
    # Create a 1x1 PNG and resize it
    python3 -c "
from PIL import Image
import os

os.makedirs('assets', exist_ok=True)

# Create icon.png (1024x1024)
img = Image.new('RGB', (1024, 1024), color='#0c64e0')
img.save('assets/icon.png')

# Create splash.png (1242x2436)
img = Image.new('RGB', (1242, 2436), color='#0c64e0')
img.save('assets/splash.png')

# Create adaptive-icon.png (1024x1024)
img = Image.new('RGB', (1024, 1024), color='#0c64e0')
img.save('assets/adaptive-icon.png')

# Create favicon.png (48x48)
img = Image.new('RGB', (48, 48), color='#0c64e0')
img.save('assets/favicon.png')

print('✅ Created placeholder assets using Python PIL')
" 2>/dev/null || echo "Python PIL not available"
else
    echo "⚠️  No image tools found. Creating minimal solution..."
fi

