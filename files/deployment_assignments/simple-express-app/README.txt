PS 49 - Local Express App & Deployment Steps

1. Steps to run locally:
   - Open a terminal in this folder.
   - Run: npm init -y
   - Run: npm install express
   - Run: node server.js
   - The server will start on port 3000.

2. How to test routes in browser or Postman:
   - Go to your browser and type: http://localhost:3000/
     You should see "Hello World".
   - Type: http://localhost:3000/status
     You should see JSON with status "running" and the time.
   - Type: http://localhost:3000/info
     You should see your Name and PRN in JSON format.
   - You can also paste these links in Postman and click "Send".

3. Deployment steps on Render:
   - Go to Render.com and create an account.
   - Click on "New Web Service".
   - Connect your GitHub account and select your repository containing this code.
   - Set the Start Command to: node server.js
   - Go to "Environment Variables" and add a new key called PORT, and set the value to 3000.
   - Click "Create Web Service" and wait for it to deploy.
   - Your app will be live on a new Render URL!
