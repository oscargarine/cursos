"use client"

import { useUser } from "@clerk/nextjs";
import { formatPrice } from "@/lib/formatPrice"
import { Progress } from "@/components/ui/progress"
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse";
import { ProgressCourseProps } from "./ProgressCourse.types";
import { useEffect, useState } from "react";

export function ProgressCourse(props: ProgressCourseProps) {

  const { courseId, totalChapters, price } = props

  const { user } = useUser()
  const [progressCourse, setProgressCourse] = useState<number>(0)

  useEffect(() => {
    const fetchProgress = async () => {
      if(user?.id) {
        const progress = await getUserProgressByCourse(user.id, courseId)
        setProgressCourse(progress)
      }
    }
    fetchProgress()
  }, [user?.id])

  if (!user) {
    return <p className="text-xs mt-2">Not signed in</p>
  }

  return (
    <div className="mt-4">
      {totalChapters > 0 && progressCourse > 0 ? (
        <div>
          <Progress value={progressCourse} className="[&>*]:bg-violet-300" />
          <p className="text-xs mt-1">{progressCourse}% Completado</p>
        </div>
      ) : (
        <h4>{formatPrice(price)}</h4>
      )}
    </div>
  )
}
