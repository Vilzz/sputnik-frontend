import { Table } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoGear, GoTrashcan } from 'react-icons/go'
import { API_URL } from '@/config/index'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Categories = ({ categories, token }) => {
  const router = useRouter()
  const deleteCategory = async (e) => {
    let id
    if (e.target.nodeName === 'path') {
      id = e.target.parentNode.attributes.data.value
    } else {
      id = e.target.attributes.data.value
    }
    if (confirm(`Будет удалена категория! Вы уверены?`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const res = await axios.delete(`${API_URL}categories/${id}`, config)
        toast.success(`Категория удалена успешно`)
        router.push('/admin/category')
      } catch (error) {
        toast.error(`${error.response.data.error}`)
      }
    }
  }
  return (
    <>
      <ToastContainer />
      <Table
        striped
        bordered
        responsive
        size='sm'
        className='table-gray table align-middle'
      >
        <thead>
          <tr className='table-dark'>
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
          {categories
            .filter((category) => category._id !== '60c594a53347701fc71ccf5f')
            //Скрыл служебную категорию, в которую попадают макеты при удаление их категории
            .map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.name_en}</td>
                <td>{category.description}</td>
                <td>{category.description_en}</td>
                {category.image ? (
                  <td>
                    <Image src={category.image} width='50px' height='50px' />
                  </td>
                ) : (
                  <td>Нет Фото</td>
                )}
                <td>{category.order}</td>
                <td>{category.showinmenu ? 'Да' : 'Нет'}</td>
                <td>
                  <div className='d-flex'>
                    <Link href={`/admin/category/${category._id}`}>
                      <a className='btn btn-xs btn-primary me-1'>
                        <GoGear />
                      </a>
                    </Link>
                    <button
                      className='btn btn-xs btn-danger'
                      data={category._id}
                      onClick={(e) => deleteCategory(e)}
                    >
                      <GoTrashcan data={category._id} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default Categories
