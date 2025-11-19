import prisma from '@/lib/prisma'

export const getUserProgressByCourse = async (
  courseId: string,
  userId: string
): Promise<number> => {

  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    })

    if(!purchase) {
      return 0
    }

    const totalChapters = await prisma.chapter.count({
      where: {
        courseId
      }
    })

    if(totalChapters === 0) {
      return 0
    }

    const completedChapters = await prisma.userProgress.count({
      where: {
        userId,
        isCompleted: true,
        chapter: {
          courseId
        }
      }
    })

    const progressPorcentage = Math.round((completedChapters / totalChapters) * 100)

    return progressPorcentage

  } catch (error) {
    console.log("[GET_USER_PROGRESS_BY_COURSE]", error)

    return 0
  }
}