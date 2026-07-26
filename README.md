# STLACCESS — Mini Scale Converter

A fast, simple browser tool to scale 3D files between different miniature sizes. I built this specifically to take the guesswork out of sizing up tabletop prints.

No file uploads, no user accounts, no cookies. Privacy-first, cookie-free analytics (Umami) for basic pageview stats. Every calculation runs directly in your browser.

### Why I Built This

Messing with scale adjustments is one of the most tedious parts of 3D printing miniatures. I got tired of guessing percentage slides inside my slicer or getting mixed results because different sculptors treat heights differently. 

I put this engine together using a flat 175cm human baseline as my starting index, calculating changes from eye-level height rather than the top of a helmet or hair. It gives me consistent results across different creators, so I figured other folks in the hobby could use it too.

### How It Works

*   **Scale Shifting:** Move numbers between common tabletop footprints (like 28mm, 32mm Heroic, or 75mm) and model kit ratios (1:35, 1:48, 1:72).
*   **Measurement Toggles:** Account for eye-level sizing vs full height calculations depending on how the model was sculpted.
*   **Material Shrinkage:** Tweak your scale by fractional percentages to counteract natural resin shrinkage.
*   **Quick Reference List:** Jump straight to standard conversion setups that I use most frequently for my own games.
*   **My Library:** Save your custom setups locally inside your browser's memory.
*   **Privacy-First:** Your project files and dimensions stay on your hardware. Nothing is uploaded to a server.

### Try the Tool

👉 **[Launch STLACCESS](https://stlaccess.com)**

### The Stack

*   Built with HTML, Tailwind CSS, and plain JavaScript.
*   Runs completely client-side (no backend database overhead).

### Updates, Tweaks, & Suggestions

If you run into an inaccurate calculation or want to suggest a new preset scale layout, use the input forms directly on the website to submit your notes. I monitor those requests and push out regular manual updates whenever there's a strong demand from the community for a specific conversion. 

For bug reports or code-level changes, feel free to open a ticket or a pull request right here on the repository.

---

**Built by [kitsorix](https://github.com/kitsorix-official)** — because getting miniatures to look right next to each other shouldn't be a chore.