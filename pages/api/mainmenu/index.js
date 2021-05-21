import axios from 'axios'
import { API_URL } from '@/config/index'

export default async (req, res) => {
  const menu = await axios.get(`${API_URL}/api/v1/mainmenu`)

  if (menu) {
    res.status(200).json(menu.data.data)
  }
}
