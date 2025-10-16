"use client"

import { DragDropContext, Droppable, DropResult, Draggable } from "@hello-pangea/dnd"

import { GripVertical, ListCheck, Loader2, Pencil, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ChaptersBlockProps } from "./ChaptersBlock.types";

import { TitleBlock } from "../TitleBlock";
import { useEffect, useState } from "react";
import { FormChapterName } from "../FormChapterName";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function ChaptersBlock(props: ChaptersBlockProps) {
  const { idCourse, chapters } = props
  const [chaptersList, setChaptersList] = useState(chapters ?? [])
  const [ShowInputChapter, setShowInputChapter] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setChaptersList(chapters ?? [])
  }, [chapters])

  const onEditChapter = (chapterId: string) => {
    router.push(`/teacher/${idCourse}/${chapterId}`)
  }

  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return

    const items = Array.from(chaptersList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setChaptersList(items)

    const bulkUpdate = items.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }))

    onReorder(bulkUpdate)
  }

    const onReorder = async (updateData: {id:  string, position: number}[]) => {
      try {
        setIsUpdating(true)
        await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
          list: updateData
        })

        toast("Orden actualizado")
        router.refresh()

      } catch {
        toast.error("Ups algo salió mal.")
      } finally {
        setIsUpdating(false)
      }
    }


  return (
    <div className="p-6 bg-white-md h-fit relative">
      <TitleBlock title="Capítulos del curso" icon={ListCheck} />

      <div className="flex gap-2 items-center justify-between mb-3">
        <p>Capítulos completos</p>

        <Button variant="outline" size="sm" onClick={() => setShowInputChapter(true)}>
          <PlusCircle className="w-4 h-4" />
          Crear capítulo
        </Button>
      </div>

      {ShowInputChapter && (
        <FormChapterName
          setShowInputChapter={setShowInputChapter}
          idCourse={idCourse}
        />
      )}

      {isUpdating && (
        <div className="abosulte top-0 right-0 flex items-center justify-center w-full h-full bg-slate-500/20">
          <Loader2 className="w-6 h-6 animate-spain text-violet-500" />
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div
              { ...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-2"
            >

              {chaptersList?.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      { ... provided.draggableProps}
                      { ... provided.dragHandleProps }
                      className="flex gap-2 items-center bg-slate-100 rounded-md py-2 px-4 text-sm justify-between"
                      >
                        <div className="flex gap-2 items-center">
                          <GripVertical className="w-4 h-4 text-gray-500" />
                          <p>{chapter.title}</p>
                        </div>

                        <div className="flex gap-2 items-center px-2 py-1">
                          {chapter.isPublished ? (
                            <p className="px-2 py-1 text-emerald-600">
                              Publicado
                            </p>
                          ):(
                            <p className="px-2 py-1 text-gray-700">
                              Sin publicar
                            </p>
                          )}
                          <div className="cursor-pointer" onClick={() => onEditChapter(chapter.id)}
                            >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </div>
                        </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}

        </Droppable>
      </DragDropContext>

    </div>
  )
}
