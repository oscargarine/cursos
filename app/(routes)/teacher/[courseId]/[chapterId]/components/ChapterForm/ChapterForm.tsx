"use client"

import { ArrowLeft, Cog, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { ChapterFormProps } from "./ChapterForm.types"
import { TitleBlock } from "../../../components"
import axios from "axios"
import { toast } from "sonner"
import { ChapterTitleForm } from "./ChapterTitleForm/ChapterTitleForm"
import { ChapterVideoForm } from "./ChapterVideoForm"

export function ChapterForm(props: ChapterFormProps) {
  const { chapter, courseId } = props

  const router = useRouter()

  if (!chapter) {
    return null
  }

  const onPublish = async (state: boolean) => {
    try {
      axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        isPublished: state,
      })

      toast(state ? "Capítulo publicado" : "Capítulo ocultado")

      router.refresh()
    } catch (error) {
      console.log(error)

      toast.error("Ups, algo salió mal")
    }
  }

  const removeChapter = async () => {
    axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`)

    router.push(`/teacher/${courseId}`)

    toast("Capitulo eliminado")
  }


  return (
    <div>
      <div className="p-6 bg-white rounded-md">
        <Button className="mb-4" variant="outline" onClick={() => router.push(`/teacher/${courseId}`)}>
          <ArrowLeft />
          Volver a la edición del curso
        </Button>
      </div>

        <div className="p-6 mt-6 bg-white rounded-md flex justify-between items-center">
          <TitleBlock title="Configuración del capítulo" icon={Cog} />

          <div className="gap-2 flex items-center">
            {chapter.isPublished ? (
              <Button
                variant="outline"
                onClick={() => onPublish(false)}
                >
                  Ocultar
                </Button>
            ):(
              <Button onClick={() => onPublish(true)}>Publicar</Button>
            )}

            <Button variant="destructive" onClick={removeChapter}>
              <Trash />
            </Button>
          </div>
      </div>

      <ChapterTitleForm courseId={courseId} chapter={chapter}/>

      <ChapterVideoForm
        chapterId={chapter.id}
        courseId={courseId}
        videoUrl={chapter.videoUrl}
      />
    </div>
  )
}
