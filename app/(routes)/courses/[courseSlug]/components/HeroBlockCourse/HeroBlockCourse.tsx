"use client"

import { useState } from "react";
import { HeroBlockCourseProps } from "./HeroBlockCourse.types";
import { useRouter } from "next/navigation";
import { IconBadge } from "@/components/Shared";
import { Calendar, ChartNoAxesColumn, Timer } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroBlockCourse(props: HeroBlockCourseProps) {

  const { course, purchaseCourse } = props

  const {title, id, description, price, level, imageUrl, updatedAt, slug, chapters } = course

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const enrollCourse = async() => {
    console.log("Enroll course")
  }

  const redirectToCourse = () => {
    router.push(`/courses/${slug}/${chapters[0].id}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt6">
      <div>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-balance mt-2">{description}</p>

      <div className="flex flex-col gap-3 mt-5 text-gray-600">
        <IconBadge icon={Timer} text="7h 40min" />

        <IconBadge icon={Calendar} text={`Última actualización: ${new Date(updatedAt).toLocaleDateString("es-ES")}`} />

        <IconBadge icon={ChartNoAxesColumn} text={level || ""} />

      </div>

      <h2 className="text-xl font-semibold my-4">{formatPrice(price)}</h2>

      {purchaseCourse ? (
        <Button
          onClick={redirectToCourse}
          className="hover:bg-violet-400 text-white font-semibold"
          disabled={isLoading}
        >
          Ver curso
          </Button>
          ) : (
            <Button
              onClick={enrollCourse}
              className="hover:bg-violet-400 text-white font-semibold" disabled={isLoading}>
              Inscribirse ahora
            </Button>
          )}
      </div>

      <Image
        src={imageUrl || "default-course.webp"}
        alt={title}
        width={500}
        height={400}
        className="rounded-md"
      />
    </div>
  )
}

