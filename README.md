# RussoFlix 🎬

A modern movie discovery application built with React, Tailwind CSS, and Firebase, featuring user authentication, watchlist management, and movie search capabilities.

## Features

- **Movie Discovery**: Browse popular and trending movies
- **Search Functionality**: Search for movies by title
- **User Authentication**: Sign up and login with Firebase Auth
- **Watchlist Management**: Add/remove movies to your personal watchlist
- **Movie Details**: View detailed information about movies including cast, crew, and trailers
- **Responsive Design**: Mobile-friendly interface with hamburger menu
- **Real-time Data**: Watchlist data persisted in Firestore

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication & Firestore)
- **API**: The Movie Database (TMDB) API
- **State Management**: React Context API
- **Routing**: React Router DOM

## Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project setup
- TMDB API key

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd russo_flix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Add your web app and copy the configuration

### 5. TMDB API Setup

1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Go to Settings > API and request an API key
3. Add the API key to your `.env` file

### 6. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.jsx   # Movie display card
│   ├── Navbar.jsx      # Navigation bar
│   ├── Pagination.jsx  # Pagination component
│   ├── Search.jsx      # Search input
│   ├── Spinner.jsx     # Loading spinner
│   └── Toast.jsx       # Toast notifications
├── config/             # Configuration files
│   └── api.js          # API constants and configuration
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication context
│   ├── WatchlistProvider.jsx # Watchlist state management
│   └── ToastProvider.jsx     # Toast notifications
├── pages/              # Main application pages
│   ├── Home.jsx        # Homepage with movie discovery
│   ├── MovieDetails.jsx # Individual movie details
│   ├── SearchPage.jsx  # Search results page
│   └── Watchlist.jsx   # User's watchlist page
├── services/           # External service integrations
│   ├── firebase.js     # Firebase configuration
│   └── firestore.js    # Firestore database operations
└── main.jsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Implementation

### Authentication

- Firebase Authentication with email/password
- Protected routes for authenticated users
- Persistent login state

### Watchlist Management

- Add/remove movies from personal watchlist
- Real-time synchronization with Firestore
- Loading states and user feedback
- Clear all watchlist functionality

### Movie Discovery

- Popular movies on homepage
- Trending movies section
- Search functionality with pagination
- Detailed movie information with cast and crew

### Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly interactions

## API Integration

The application integrates with:

- **TMDB API**: For movie data, images, and search functionality
- **Firebase Firestore**: For user watchlist persistence
- **Firebase Auth**: For user authentication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Demo Video

🎥 **Demo Video**: [View on Google Drive](https://drive.google.com/your-demo-video-link)

_The demo video showcases all the key features including user authentication, movie browsing, search functionality, and watchlist management._

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [Firebase](https://firebase.google.com/) for backend services
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

---

**Built with ❤️ using React and Firebase**
