import { ExploreCourses } from '@/app/(routes)/(root)/components'
import { ListCoursesProps } from './listCourses.types'
import Link from 'next/link'

export function ListCourses(props: ListCoursesProps) {

  const { title, courses } = props

  return (
    <div>
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <h2>{title}</h2>

        <div className="border-b-[1px] py-2" />

          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
              {courses.map((){id, imageUrl, title, level, price, slug, category, chapters}) => (
                <Link key={id} href={`/courses/${slug}`}
                  className="border rounded-lg relative transition-shadow hover: shadow-lg shadow-violet-300/40 shadow-md">
                  <span>{category}</span>
                </Link>
              )
              )}
            </div>
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No hay cursos disponibles en este momento
              </p>
          )}

      </div>

    </div>
  )
}

