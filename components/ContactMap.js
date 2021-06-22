import Leaflet from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { FaGlobe, FaPhoneAlt, FaInstagram, FaVk } from 'react-icons/fa'
import { GoGlobe } from 'react-icons/go'
import { HiOutlineMail } from 'react-icons/hi'
import {
  COORDS,
  BASEMAP,
  ADDRESS,
  ADDRESS_EN,
  PHONE,
  EMAIL,
  SITE,
  INSTAGRAM,
  VK,
} from '@/config/index'
import { Col, ListGroup } from 'react-bootstrap'
const icon = Leaflet.icon({
  iconUrl: '/images/map/marker-icon.png',
  iconRetinaUrl: '/images/map/marker-icon-2x.png',
  shadowUrl: '/images/map/marker-shadow.png',
})
const ContactMap = ({
  locale,
  position,
  basemap,
  address,
  address_en,
  phone,
  email,
  site,
  instagram,
  vk,
}) => {
  return (
    <Col md={{ offset: 2, span: 8 }} className='mb-4'>
      <ListGroup className='mb-3'>
        <ListGroup.Item className='d-flex justify-content-between'>
          <strong>
            <GoGlobe className='me-2' />
            {locale === 'ru-RU' ? 'Адрес:' : 'Address:'}
          </strong>
          <span>{locale === 'ru-RU' ? address : address_en}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between'>
          <strong>
            <FaPhoneAlt className='me-2' />
            {locale === 'ru-RU' ? 'Телефон:' : 'Phone:'}
          </strong>
          <span>{phone}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between'>
          <strong>
            <HiOutlineMail className='me-2' />
            {locale === 'ru-RU' ? 'Электронная почта:' : 'E-mail:'}
          </strong>
          <span>{email}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between'>
          <strong>
            <FaGlobe className='me-2' />
            {locale === 'ru-RU' ? 'Сайт:' : 'Site:'}
          </strong>
          <span>{site}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between'>
          <strong>
            <FaInstagram className='me-2' />
            Instagram:
          </strong>{' '}
          <span>{instagram}</span>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex justify-content-between'>
          <strong>
            <FaVk className='me-2' />
            VK:
          </strong>{' '}
          <span>{vk}</span>
        </ListGroup.Item>
      </ListGroup>
      <MapContainer center={position} zoom={13} crollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={basemap}
        />
        <Marker position={position} icon={icon}>
          <Popup position={position}>
            <div className='d-flex flex-column align-items-center'>
              {locale === 'ru-RU' ? (
                <>
                  <h5 className='lh-1'>Макетная компания Спутник</h5>
                  <p className='lh-1 text-muted'>{address}</p>
                </>
              ) : (
                <>
                  <h5 className='lh-1'>Sputnik maket company</h5>
                  <p className='lh-1 text-muted'>{address_en}</p>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </Col>
  )
}

ContactMap.defaultProps = {
  position: COORDS,
  basemap: BASEMAP,
  address: ADDRESS,
  address_en: ADDRESS_EN,
  phone: PHONE,
  email: EMAIL,
  site: SITE,
  instagram: INSTAGRAM,
  vk: VK,
}

export default ContactMap
