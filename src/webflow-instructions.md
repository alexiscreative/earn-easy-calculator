
# Embedding UK Salary Calculator in Webflow

Follow these steps to integrate the UK Salary Calculator into your Webflow site:

## Option 1: Using an iFrame (Easiest)

1. Build your React app: `npm run build`
2. Deploy the built app to a hosting service (Netlify, Vercel, GitHub Pages, etc.)
3. In Webflow, add an "Embed" element where you want the calculator to appear
4. Set the iFrame source to your deployed application URL
5. Set the iFrame width to 100% and height to at least 800px (adjust as needed)

## Option 2: Direct Script Embedding (Advanced)

1. Build your app by running `npm run build` in your project terminal
2. Navigate to the `dist/assets` folder in your project
3. Look for a file named `webflow-embed.[hash].js` - this is your standalone calculator script
4. Also find the CSS file(s) in the assets folder
5. Upload both files to a file hosting service or your own server
6. In Webflow, add an "Embed" element with this HTML (replace URLs with your hosted file locations):

```html
<!-- Container for the calculator -->
<div id="uk-salary-calculator-root"></div>

<!-- Load the styles and script -->
<link href="https://your-hosting.com/path/to/styles.css" rel="stylesheet">
<script src="https://your-hosting.com/path/to/webflow-embed.[hash].js"></script>
```

## Downloading the Files

After building your app with `npm run build`:

1. If using Lovable's online editor:
   - Click "Dev Mode" in the top left corner
   - Navigate to the `dist/assets` folder
   - Right-click on the required files and select "Download"

2. If working locally:
   - Navigate to the `dist/assets` folder in your file explorer
   - Copy the required JS and CSS files

## Testing Your Embedding

Before deploying to your live Webflow site, you can test the embedding locally:

1. Create a simple HTML file on your computer
2. Add the embedding code from Option 2 above
3. Replace the file paths with the relative paths to your local files
4. Open the HTML file in a browser to check if the calculator works

## Troubleshooting

- Check your browser's console for any errors (F12 to open developer tools)
- Ensure your CSS and JS files are accessible from your Webflow site
- If you see CORS errors, make sure your hosting service allows cross-origin requests
