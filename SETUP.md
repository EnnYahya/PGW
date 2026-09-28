# Paris Games Week Website - Setup Guide

## 1. Add your logos
These logos are already in the `images` folder (replace the files to swap them):
- logo-ailco.png
- logo-stugamers.png
- logo-pgw.png

(Any image format works, just update the file name in index.html, qa.html, admin.html if it's not .png)

## 2. Create a Firebase project
Same steps as before:
1. Go to https://console.firebase.google.com and click "Add project"
2. Name it something like "PGW" or "ParisGamesWeek"
3. Enable Firestore Database (Standard edition, production mode)
4. Go to Project Settings > General > scroll to "Your apps" > click the web icon </> to register a new web app
5. Copy the firebaseConfig values shown and paste them into js/firebase-config.js (replacing the placeholder values)

## 3. Set Firestore rules
Go to Firestore Database > Rules tab, paste in the contents of firestore.rules, and click Publish.

## 4. Add your links
- In index.html, find PASTE_YOUR_GOOGLE_FORM_LINK_HERE and replace with your real Google Form link.
- In index.html, find PASTE_YOUR_STRAWPAGE_LINK_HERE and replace with your straw.page link.

## 5. Admin username
The secret admin username is: adminpartygamesweek
Anyone who types this exact username on the login page gets sent to the admin dashboard.
You can change this in js/auth.js (look for ADMIN_USERNAME).

## 6. Upload to GitHub
1. Create a new repository, e.g. "PGW"
2. Upload all files keeping the folder structure (css/, js/, images/)
3. Go to Settings > Pages, enable GitHub Pages on the main branch
4. Your site will be live at https://yourusername.github.io/PGW/

## Note on security
The Firestore rules in this version are simple and open (no real password protection on the database
itself, just a hidden username the site UI checks). This is fine for a casual club/school site, but
someone technical could bypass it if they tried. Let Claude know if you want tighter database rules added.

## Background image
`images/site-background.png` is a plain green placeholder. To change it, upload your own picture to GitHub with the exact same name (`images/site-background.png`).
