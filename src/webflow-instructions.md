
# Embedding UK Salary Calculator in Webflow

Follow these steps to integrate the UK Salary Calculator into your Webflow site:

## Option 1: Using an iFrame (Easiest)

1. Build your React app: `npm run build`
2. Deploy the built app to a hosting service (Netlify, Vercel, GitHub Pages, etc.)
3. In Webflow, add an "Embed" element where you want the calculator to appear
4. Set the iFrame source to your deployed application URL
5. Set the iFrame width to 100% and height to at least 800px (adjust as needed)

## Option 2: Direct Script Embedding (Advanced)

1. Build your React app with a bundler that supports UMD or IIFE output
2. Configure your bundler to output a single JS file with all dependencies included
3. Host this JS file and your CSS file on a CDN or file hosting service
4. In Webflow, add an "Embed" element with this HTML:

```html
<!-- Container for the calculator -->
<div id="uk-salary-calculator-root"></div>

<!-- Load the required scripts -->
<link href="https://your-hosting.com/path/to/styles.css" rel="stylesheet">
<script src="https://your-hosting.com/path/to/bundle.js"></script>
<script>
  // Initialize the calculator when the script is loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (window.initUKSalaryCalculator) {
      window.initUKSalaryCalculator();
    }
  });
</script>
```

## Styling Considerations

- The calculator uses Tailwind CSS, which is scoped to prevent conflicts
- You may need to adjust CSS to match your Webflow site's styling
- Use the browser inspector to identify any CSS conflicts

## Troubleshooting

- If the calculator doesn't appear, check the browser console for errors
- Ensure all scripts are loading correctly (no CORS issues)
- For iFrame embedding, make sure the frame has sufficient height
