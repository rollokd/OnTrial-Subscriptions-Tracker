# onTrial 
## Overview
This **OnTrial Subscription Tracker** enables users to effectively manage their subscriptions. Users can view, add, update, and delete subscriptions, as well as receive timely in-app notifications for upcoming billing dates.

## Features
- **View All Subscriptions**: Includes details such as name, cost, billing date, and status.
- **CRUD Operations**: Add, update, and delete subscriptions with ease.
- **In-App Notifications**: Using cronJob

## Prerequisites
- Node.js (version 14+ recommended)
- MongoDB (local installation or MongoDB Atlas cluster)
- npm (included with Node.js)

## Local Setup
```bash
# Clone the repository
git clone https://github.com/ByteBlink/OnTrial-Subscriptions-Tracker.git
cd ontrial/server 


# Install dependencies
npm install

# Setup environment variables
echo "MONGODB_URI=mongodb://localhost:27017/subscriptions" >> .env
echo "PORT=3000" >> .env
# Note: Replace the MONGODB_URI value if using a remote MongoDB database.

# Start the backend server
nodemon
# Access the server at http://localhost:3000 (or the custom PORT you've set)

# Setup frontend (if separate)
cd ontrial/client
npm install
npm run dev
# Your default web browser should open the application automatically.

Any question?! Reach out to me. 
