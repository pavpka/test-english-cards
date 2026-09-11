import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from '../components/Header'
import { Footer, type Contacts } from '../components/Footer'
import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'
import HomePage from '../pages/HomePage'
import CardsPage from '../pages/CardsPage'
import ProfilePage from '../pages/ProfilePage'
import LoginPage from '../pages/LoginPage'
import { useAppSelector } from '../store/hooks'

const contacts: Contacts = [
	{
		label: "О нас",
		links: [
			{label: "Новости", url: "https://google.com"},
			{label: "Карьера", url: "https://google.com"},
			{label: "Контакты", url: "https://google.com"},
		]
	},
	{
		label: "Соцсети",
		links: [
			{label: "VK", url: "https://vk.com"},
			{label: "Youtube", url: "https://youtube.com"},
			{label: "TikTok", url: "https://tiktok.com"},
		]
	}

]

function App() {
  	const { isAuthenticated, username } = useAppSelector((state) => state.auth);
	return (
		<div className="app">
		<Header isAuthenticated = {isAuthenticated}
				username = {username}/>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/cards" element={<CardsPage />} />

			<Route element={<ProtectedRoute />}>
				<Route path="/profile" element={<ProfilePage />} />
			</Route>
			<Route element={<PublicRoute />}>
				<Route path="/login" element={<LoginPage />} />
			</Route>
			<Route path="*" element={<div className="app__not-found">Not found</div>} />
		</Routes>
		<Footer contacts = {contacts}/>
		</div>
	)
}

export default App
