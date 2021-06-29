import { useRouter } from 'next/router'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchForm = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/search?search=${searchText}`)
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Control
          size='sm'
          type='text'
          name='searchtext'
          placeholder={
            router.locale === 'ru-RU' ? 'Найти макет' : 'Search for maket'
          }
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='d-grid mt-2'>
        <Button type='submit' size='sm'>
          {router.locale === 'ru-RU' ? 'Найти' : 'Search'}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SearchForm
