import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { Row, Col, Badge, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoGear, GoTrashcan } from 'react-icons/go'
import { RiPriceTag2Line } from 'react-icons/ri'

const MaketsList = ({ makets, token }) => {
  const router = useRouter()
  const deleteMaket = async (e) => {
    const maketId = e.target.attributes.data.value
    if (confirm(`Будет удален макет! Вы уверены?`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        await axios.delete(`${API_URL}makets/${maketId}`, config)
        toast.success(`Макет удален успешно`)
        router.push('/admin/makets')
      } catch (error) {
        toast.error(`${error.response.data.error}`)
      }
    }
  }
  return (
    <>
      <ToastContainer />
      {makets.map((maket) => (
        <Row className='mb-4 maket-unit' key={maket._id}>
          <Col md={4} lg={3}>
            {maket.images.length > 0 ? (
              <Image src={maket.images[0]} width={220} height={330} />
            ) : (
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ minWidth: '220px', minHeight: '330px' }}
              >
                No Image
              </div>
            )}
          </Col>
          <Col md={8} lg={9} className='py-2 maket-admin'>
            <div className='lh-2'>
              Наименование:
              <span>{maket.name}</span>
            </div>
            <div className='lh-2'>
              Наименование на английском:
              <span>{maket.name_en}</span>
            </div>
            <div className='lh-2'>
              Краткое описание:
              <span>{maket.shortdesc}</span>
            </div>
            <div className='lh-2'>
              Краткое описание на английском:
              <span>{maket.shortdesc_en}</span>
            </div>
            <div className='lh-2 text-truncate maket-description'>
              Описание:
              <span className='px-3'>{maket.description}</span>
            </div>
            <div className='lh-2 text-truncate maket-description'>
              Описание на английском:
              <span className='px-3'>{maket.description_en}</span>
            </div>
            <div className='lh-2'>
              Ключевые слова
              <span>{maket.keywords.join(',')}</span>
            </div>
            <div className='lh-2 mb-2'>
              Ключевые слова на англ.
              <span>{maket.keywords_en.join(',')}</span>
            </div>
            <Row>
              <Col md={8} className='d-flex justify-content-start'>
                Масштабы:
                <div className='ms-3'>
                  {maket.scales.length > 0 &&
                    maket.scales.map((scale) => (
                      <Badge
                        variant='info'
                        className='bg-success me-1'
                        key={scale}
                      >
                        {scale}
                      </Badge>
                    ))}
                </div>
              </Col>
              <Col md={4} className='d-flex justify-content-start pt-2 pt-md-0'>
                Опубликовано:
                <div className='ms-3'>
                  {maket.published ? (
                    <Badge className='bg-success'>ДА</Badge>
                  ) : (
                    <Badge className='bg-danger'>НЕТ</Badge>
                  )}
                </div>
              </Col>
            </Row>
            <hr />
            <div className='d-flex justify-content-center mt-3'>
              <Link href={`/admin/makets/${maket._id}/prices`}>
                <a className='btn btn-warning text-white fw-bold me-2'>
                  <RiPriceTag2Line /> Цены
                </a>
              </Link>
              <Link href={`/admin/makets/${maket._id}`}>
                <a className='btn btn-primary fw-bold me-2'>
                  <GoGear /> Изменить
                </a>
              </Link>
              <Button
                variant='danger'
                data={maket._id}
                className='fw-bold'
                onClick={(e) => deleteMaket(e)}
              >
                <GoTrashcan /> Удалить
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default MaketsList
