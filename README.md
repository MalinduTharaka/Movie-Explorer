# Movie Explorer

A movie browsing application built using **React + Vite**, styled with **MUI**, and powered by the **TMDb API**.

## 🚀 Features Implemented

- 🔍 Search movies by title
- 🎬 View full movie details including genres, cast, and trailer
- 📺 Embedded YouTube trailers (via TMDb video data)
- 🧭 Browse trending movies
- 🎛️ Basic filters for genre, year, rating
- 🌞 Light theme using MUI

---

## ⚙️ Project Setup

### 1. Clone the Repo
```bash
git clone https://github.com/yourname/movie-explorer.git
cd movie-explorer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```
Replace values with your TMDb credentials.

### 4. Run the App
```bash
npm run dev
```
App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

### API Usage
- Uses **Axios** to interact with the [TMDb API](https://developer.themoviedb.org/docs)
- Pre-configured Axios instance in `src/api/tmdb.js`
- Endpoints used:
  - `/trending/movie/week`
  - `/search/movie`
  - `/movie/:id?append_to_response=videos,credits`

### Trailer Embeds
- TMDb returns video keys for YouTube
- These are embedded via:
```jsx
<iframe src={`https://www.youtube.com/embed/${video.key}`} />
```

### Movie Filters (Basic)
- UI for filtering by genre, year, and rating is stubbed in
- Use `Array.prototype.filter` on movie results to apply filters

---

## 📦 Build and Deploy

To build the app:
```bash
npm run build
```
---

## 🧪 Future Improvements
- Add user authentication
- Store favorites on backend
- Add dark mode toggle
- Paginate search results

---

## 🛠 Tech Stack
- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [MUI](https://mui.com)
- [React Router](https://reactrouter.com)
- [TMDb API](https://developer.themoviedb.org/docs)
