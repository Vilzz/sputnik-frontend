import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Badge, Button } from 'react-bootstrap'
import { GoGear, GoTrashcan } from 'react-icons/go'
import { RiPriceTag2Line } from 'react-icons/ri'

const MaketsList = ({ makets, token }) => {
  const router = useRouter()
  return (
    <>
      {makets.map((maket) => (
        <Row className='mb-4'>
          <Col md={4}>
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
          <Col md={8} className='py-2'>
            <p className='d-flex justify-content-between lh-1'>
              Наименование:
              <span className='text-primary fw-bold'>{maket.name}</span>
            </p>
            <p className='d-flex justify-content-between lh-1'>
              Наименование на английском:
              <span className='text-primary fw-bold'>{maket.name_en}</span>
            </p>
            <p className='d-flex justify-content-between lh-1'>
              Краткое описание:
              <span className='text-primary'>{maket.shortdesc}</span>
            </p>
            <p className='d-flex justify-content-between lh-1'>
              Краткое описание на английском:
              <span className='text-primary'>{maket.shortdesc_en}</span>
            </p>
            <p className='lh-sm text-truncate'>
              Описание: <br />
              <span className='text-primary'>{maket.description}</span>
            </p>
            <p className='lh-sm text-truncate'>
              Описание на английском: <br />
              <span className='text-primary'>{maket.description_en}</span>
            </p>
            <Row className='d-flex justify-content-evenly'>
              <Col md={7}>
                Масштабы:
                {maket.scales.length > 0 &&
                  maket.scales.map((scale) => (
                    <Badge variant='info' className='bg-success mx-1'>
                      {scale}
                    </Badge>
                  ))}
              </Col>
              <Col md={5} className='pt-2 pt-md-0'>
                Опубликовано:
                {maket.published ? (
                  <div className='badge bg-success mx-2'>ДА</div>
                ) : (
                  <div className='badge bg-danger mx-2'>НЕТ</div>
                )}
              </Col>
            </Row>
            <div className='d-flex justify-content-center mt-3'>
              <Link href={`/admin/makets/${maket._id}/prices`}>
                <a className='btn btn-sm btn-warning me-2'>
                  <RiPriceTag2Line /> Цены
                </a>
              </Link>
              <Link href={`/admin/makets/${maket._id}`}>
                <a className='btn btn-sm btn-primary me-2'>
                  <GoGear /> Изменить
                </a>
              </Link>
              <Button variant='danger' data={maket._id} size='sm'>
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
