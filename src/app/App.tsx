import '../App.css'
import Header from '../components/Header'
import { Footer, type Contacts } from '../components/Footer'
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
		<>
		<Header isAuthenticated = {isAuthenticated}
				username = {username}/>
		<Footer contacts = {contacts}/>
		</>
	)
}

export default App
