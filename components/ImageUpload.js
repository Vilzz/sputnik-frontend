import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { Form, Button } from 'react-bootstrap'

const ImageUpload = ({ catId, imageUploaded }) => {
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }
  return (
    <div className={styles.form}>
      {catId}
      <h1>Загрузить изображение</h1>
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
