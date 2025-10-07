import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

import { HeaderCourse } from "./components"

export default async function CoursePage( { params }: { params : Promise<{ courseId : string}>}) {

  const { courseId } = await params
  const { userId } = await auth()

  if (!userId) {
    return <p>No tienes permisos para ver este curso.</p>
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
    include: {
      chapters: true,
    },
  })

  if (!course) {
    return <p>Este curso no existe.</p>
  }

  return (
    <div className="m-6">

      <HeaderCourse idCourse={course.id} isPublished={course.isPublished}/>
    </div>
  )
}