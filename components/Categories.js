import { Table } from 'react-bootstrap'
import Image from 'next/image'
const Categories = ({ categories }) => {
  return (
    <Table striped bordered responsive size='sm'>
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Наименование англ</th>
          <th>Описание</th>
          <th>Описание англ</th>
          <th>Изображение</th>
          <th>Порядоковый номер</th>
          <th>Показывать в меню</th>
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
            <td>{category.showinmenu.toString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Categories
