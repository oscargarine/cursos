"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

import { HeaderCourseProps } from "./HeaderCourse.types";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function HeaderCourse( props: HeaderCourseProps ) {
  const { idCourse, isPublished } = props
  const [ isLoading, setIsLoading ] = useState(false)
  const router = useRouter()

  const onPublished = async (state: boolean) => {
    setIsLoading(true)
    try {
      axios.patch(`/api/course/${idCourse}`, {
        isPublished: state,
      })

      toast(state ? "Curso publicado" : "Curso despublicado")
      router.refresh()

    } catch {
      toast("Ups, algo ha ido mal")
    }

    setIsLoading(false)
  }

  const removeCourse = async () => {
    axios.delete(`/api/course/${idCourse}`)
    toast("Curso eliminado correctamente.")

    router.push("/teacher")
  }

  return (
  <div>
    <div className="mb-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Button onClick={() => router.push('/teacher')}>
          <MoveLeft />
          Volver a todos los cursos.
        </Button>
        
      <div className="gap-2 flex items-center">
          {isPublished ? (
            <Button variant="outline" onClick={() => onPublished(false)} disabled={isLoading}>
              Despublicar
              <EyeOff />
            </Button>
          ) : (
            <Button disabled={isLoading} onClick={() => onPublished(true)}>
              Publicar
              <Eye />
            </Button>
          )}

          <Button variant="destructive" onClick={ removeCourse }>
            Eliminar
          </Button>

        </div>
      </div>
    </div>
  </div>
)}
