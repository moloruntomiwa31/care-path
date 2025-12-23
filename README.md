# CarePath

Your Complete Healthcare Companion - A modern healthcare platform built with Next.js.

## Features

### 🏥 Hospital Finder
- Locate nearby hospitals and healthcare facilities
- Real-time distance tracking using geolocation
- Interactive map view with hospital markers
- Detailed hospital information (address, phone, distance)
- Get directions to selected hospitals

### 📋 Queue Manager
- User registration system
- Join hospital queues remotely
- Live queue position tracking (auto-refresh every 5 seconds)
- View estimated wait times
- Track multiple queue positions simultaneously
- Real-time status updates (waiting, called, completed)

### 💊 Drug Validator
- AI-powered drug validation system
- Upload drug images for verification
- Check medication compatibility with symptoms
- Confidence score for validation results

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Maps:** Leaflet & React-Leaflet
- **API:** OpenStreetMap Overpass API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Package manager (npm, yarn, pnpm, or bun)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd care-path
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Features in Development

- Backend API integration
- Real hospital queue system
- AI drug validation API
- User authentication
- Appointment booking
- Medical records management

## License

MIT
