# RussoFlix 🎬

A modern movie discovery application built with React, Tailwind CSS, and Firebase, featuring user authentication, watchlist management, and movie search capabilities.

## Demo Video

🎥 **Demo Video**: [View on Google Drive](https://drive.google.com/file/d/1I2MlnTPxv6PLHR48lAXruEX522RZn35T/view?usp=sharing)

_The demo video showcases all the key features including user authentication, movie browsing, search functionality, and watchlist management._

## Features

- **Movie Discovery**: Browse popular and trending movies with smooth animations
- **Search Functionality**: Search for movies by title with enhanced UI feedback
- **User Authentication**: Sign up and login with Firebase Auth
- **Watchlist Management**: Add/remove movies to your personal watchlist with real-time updates
- **Movie Details**: View detailed information about movies including cast, crew, and trailers
- **Responsive Design**: Mobile-friendly interface with animated hamburger menu
- **Real-time Data**: Watchlist data persisted in Firestore
- **Smooth Animations**: Page transitions, hover effects, and scroll-triggered animations
- **Enhanced UX**: Loading skeletons, microinteractions, and responsive breakpoint transitions
- **Modern UI**: Clean design with gradient text effects and smooth transitions

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS with custom animations
- **Backend**: Firebase (Authentication & Firestore)
- **API**: The Movie Database (TMDB) API
- **State Management**: React Context API
- **Routing**: React Router DOM with page transitions
- **Animations**: CSS transitions and keyframe animations
- **UI/UX**: Custom hover effects and microinteractions

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
│   ├── MovieCard.jsx   # Movie display card with hover animations
│   ├── Navbar.jsx      # Navigation bar with smooth transitions
│   ├── Pagination.jsx  # Pagination component with animations
│   ├── Search.jsx      # Search input with focus effects
│   ├── Spinner.jsx     # Loading spinner
│   ├── Toast.jsx       # Toast notifications
│   ├── TrailerPopup.jsx # Movie trailer popup
│   └── TrendingMovieCard.jsx # Trending movies carousel
├── config/             # Configuration files
│   └── api.js          # API constants and configuration
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication context
│   ├── WatchlistProvider.jsx # Watchlist state management
│   ├── ToastProvider.jsx     # Toast notifications
│   ├── authProvider.jsx      # Auth provider implementation
│   ├── useAuth.js      # Auth hook
│   ├── useToast.js     # Toast hook
│   └── useWatchlist.js # Watchlist hook
├── pages/              # Main application pages
│   ├── Home.jsx        # Homepage with animated movie discovery
│   ├── MovieDetails.jsx # Individual movie details with transitions
│   ├── SearchPage.jsx  # Search results page with animations
│   └── Watchlist.jsx   # User's watchlist page
├── services/           # External service integrations
│   ├── firebase.js     # Firebase configuration
│   └── firestore.js    # Firestore database operations
├── index.css          # Global styles and animations
└── main.jsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server (typically runs on http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Performance Features

- **Optimized Loading**: Skeleton screens during data fetching
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Responsive Images**: Optimized movie poster loading
- **Efficient State Management**: Context-based state with minimal re-renders
- **Code Splitting**: Lazy loading for better performance

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

### Responsive Design & Animations

- Mobile-first approach with smooth breakpoint transitions
- Animated hamburger menu for mobile navigation
- Responsive grid layouts with hover effects
- Touch-friendly interactions with visual feedback
- Scroll-triggered animations for content sections
- Page transitions using CSS animations
- Loading skeletons and microinteractions
- Enhanced button and card hover effects

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [Firebase](https://firebase.google.com/) for backend services
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

---

**Built with ❤️ using React and Firebase**
