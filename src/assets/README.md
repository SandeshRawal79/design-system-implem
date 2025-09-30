# Assets Directory

This directory contains static assets for the Provision Intelligence Hub application.

## Structure

- `images/` - Image assets (SVG, PNG, JPG, etc.)
- `video/` - Video assets
- `audio/` - Audio assets  
- `documents/` - Document assets (PDF, etc.)

## Usage

Always import assets explicitly rather than using raw string paths:

```tsx
import myImage from '@/assets/images/my-image.png'
import myVideo from '@/assets/video/hero-background.mp4'

// Then use in JSX
<img src={myImage} />
<video src={myVideo} />
```

## Design System Assets

- `bni-logo.svg` - Placeholder logo for Provision Intelligence Hub