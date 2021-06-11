import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { Form, Button } from 'react-bootstrap'

const ImageUpload = ({ imageUploaded, token, onClose }) => {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const formData = new FormData()
    formData.append('file', image)
    formData.append('folder', 'categories')
    try {
      const res = await axios.post(`${API_URL}images`, formData, config)
      imageUploaded(res.data)
    } catch (error) {
      imageUploaded(error.response.data)
    }
    onClose()
  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }
  return (
    <div className={styles.form}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Выбери изображение</Form.Label>
          <Form.Control type='file' onChange={handleFileChange} />
        </Form.Group>
        <div className='d-grid gap-2'>
          <Button type='submit' variant='primary'>
            Загрузить
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ImageUpload
