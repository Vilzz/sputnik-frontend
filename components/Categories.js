import { Table } from 'react-bootstrap'
import Image from 'next/image'
import { GoGear, GoTrashcan } from 'react-icons/go'
import Link from 'next/link'
const Categories = ({ categories }) => {
  return (
    <Table striped bordered responsive size='sm'>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Имя англ</th>
          <th>Описание</th>
          <th>Описание англ</th>
          <th>Фото</th>
          <th>Сортировка</th>
          <th>Показать</th>
          <th>Упр</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category._id}>
            <td>{category.name}</td>
            <td>{category.name_en}</td>
            <td>{category.description}</td>
            <td>{category.description_en}</td>
            <td>
              <Image src={category.image} width='50px' height='50px' />
            </td>
            <td>{category.order}</td>
            <td>{category.showinmenu ? 'Да' : 'Нет'}</td>
            <td className='d-flex'>
              <Link href={`/admin/category/${category._id}`}>
                <a className='btn btn-xs btn-primary me-1'>
                  <GoGear />
                </a>
              </Link>

              <button className='btn btn-xs btn-danger'>
                <GoTrashcan />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Categories
