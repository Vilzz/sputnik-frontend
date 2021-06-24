import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { Col, Row, ListGroup, Button, Badge } from 'react-bootstrap'
import { GoGear, GoTrashcan } from 'react-icons/go'
import { formatDate } from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ArticlesList = ({ articles, token }) => {
  const router = useRouter()
  const deleteArticle = async (e) => {
    let id
    if (e.target.nodeName === 'path' || e.target.nodeName === 'SPAN') {
      id = e.target.parentNode.attributes.data.value
    } else {
      id = e.target.attributes.data.value
    }
    if (confirm(`Будет удалена статья! Вы уверены?`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        await axios.delete(`${API_URL}articles/${id}`, config)
        toast.success(`Статья удалена успешно`)
        router.push('/admin/articles')
      } catch (error) {
        toast.error(`${error.response.data.error}`)
      }
    }
  }
  return (
    <Row>
      <ToastContainer />
      {articles.map((article) => (
        <Col
          xs={{ span: 7, offset: 2 }}
          md={{ span: 6, offset: 0 }}
          key={article._id}
        >
          <ListGroup className='article_group'>
            <ListGroup.Item>
              <Row>
                <Col md={5}>
                  <Image src={article.image} width={150} height={100} />
                </Col>
                <Col md={7}>
                  <h6 className='text-primary lh-1'>
                    {formatDate(article.createdAt)}
                  </h6>
                  <h6 className='lh-1'>{article.title}</h6>
                  <Link href={`/admin/articles/${article._id}`}>
                    <Button
                      size='sm'
                      className='me-1 mb-1 bg-primary fw-normal'
                    >
                      <GoGear className='me-1' />
                      <span className='d-none d-md-inline'>Изменить</span>
                    </Button>
                  </Link>
                  <Button
                    size='sm'
                    data={article._id}
                    className='bg-danger fw-normal mb-1'
                    onClick={(e) => deleteArticle(e)}
                  >
                    <GoTrashcan data={article._id} className='me-1' />
                    <span className='d-none d-md-inline'>Удалить</span>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      ))}
    </Row>
  )
}

export default ArticlesList
