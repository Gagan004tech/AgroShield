# Farmer Crop Management App

A college-level application for farmers to manage their crop documentation.

## Features

- **Email Verification**: Secure login with email verification
- **User Profiles**: Create and manage farmer profiles with name, phone number, and location
- **Dashboard**: Option bar for plant parts (leaf, stem, root, fruit, flower, other), upload photos (saved to DB), CNN disease analysis, and plant suggestions with sample images per part
- **Ask**: Q&A interface with ChatGPT/LLM integration for conversational answers about crops and farming
- **Profile**: Create and manage profile, profile photo upload, and auto-detect location (browser geolocation + optional Google Maps API for address)
- **Crop Image Upload**: Upload crop parts; photos saved to database with optional CNN prediction
- **Authentication**: Secure authentication with email verification

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma (SQLite)
- NextAuth.js
- React Hook Form
- Zod

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your email credentials for verification emails.

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: CNN / ML API

To get CNN predictions on uploaded crop images:

1. Set up and run the Python ML API (see `ml-api/README.md`):
   ```bash
   cd ml-api
   python -m venv venv
   venv\Scripts\activate   # Windows
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
2. In project root `.env`, add (optional; default is `http://localhost:8000`):
   ```env
   ML_API_URL=http://localhost:8000
   ```
3. Upload an image from the dashboard; the app will call the ML API and show the CNN prediction and confidence on each image. If the ML API is not running, uploads still work but no prediction is shown.

### Optional: Ask (ChatGPT-style Q&A)

Add to `.env`:
```env
OPENAI_API_KEY=sk-your-openai-api-key
```
Then the **Ask** page will use the OpenAI API to answer farming-related questions. Without it, the Ask page returns a configuration message.

### Optional: Profile location (address from coordinates)

Add to `.env` for reverse geocoding (address from lat/lng):
```env
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```
Profile **Detect my location** uses browser geolocation; with this key the app can fill in a readable address. Without it, coordinates are still saved and a “View on Google Maps” link is shown.

## Email Configuration

For email verification to work properly, you need to configure SMTP settings in `.env`:

### Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this 16-character password (ignore spaces)

3. **Update your `.env` file**:
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASS="your-16-character-app-password"
EMAIL_FROM="your-gmail@gmail.com"
```

### Important Notes
- Use your actual Gmail address for EMAIL_USER and EMAIL_FROM
- Use the App Password (not your regular Gmail password) for EMAIL_PASS
- If email is not configured, OTP codes will be logged to the console for development
- Test the registration flow to ensure emails are being sent
