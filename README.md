# Tria I Trobar

## Overview
Tria I Trobar is an interactive web application that offers a unique user experience through a multi-stage engagement process, combining quiz mechanics with movie selection.

## Prerequisites
- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)

## Installation

### Step-by-Step Setup
1. **Install Node.js and npm**
   - Visit the [official Node.js website](https://nodejs.org/) and download the recommended version
   - Follow the [npm installation tutorial](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for detailed instructions

2. **Clone the Repository**
   ```bash
   git clone [YOUR_REPOSITORY_URL]
   cd [REPOSITORY_NAME]
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - The local development URL will be displayed in the terminal
   - Open the provided URL in your web browser

## Application Flow

### User Journey
1. **Initial Loading**
   - Splash screen with a brief loading duration
   - Automatic redirection to the landing page

2. **Landing Page**
   - Start session button initiates the experience

3. **Session Preparation**
   - Generate a unique sharing link
   - Display live participant list (currently using mock data)
   - Option to start the quiz

4. **Quiz Interaction**
   - Sequential question presentation
   - Progressive questionnaire experience

5. **Movie Selection Stage**
   - Interactive movie slider
   - Swipe right to approve
   - Swipe left to deny

6. **Results Presentation**
   - Comprehensive results displayed in card format
   - Summary of quiz and movie selection outcomes

## Features
- Responsive web design
- Interactive quiz mechanism
- Movie selection slider
- Real-time session sharing
- Engaging user interface
