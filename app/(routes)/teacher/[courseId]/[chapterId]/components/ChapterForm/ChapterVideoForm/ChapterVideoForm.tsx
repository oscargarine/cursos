"use client"

import { Pencil, Video } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ChapterVideoFormProps } from "./ChapterVideoForm.types";

import { TitleBlock } from "../../../../components";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";


export  function ChapterVideoForm(props: ChapterVideoFormProps) {

  const { chapterId, courseId, videoUrl } = props
  const [onEditVideo, setOnEditVideo] = useState(false)

  const router = useRouter()

  const onsubmit = async (url: string) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
      videoUrl: url
      })

      toast("Video actualizado")

      router.refresh()
    } catch {
        toast.error("Ups algo ha salido mal.")
    }
  }

  return <div className="mt-6 p-6 bg-white rounded-md">
    <TitleBlock title="Añade o modifica el video" icon={Video} />

    {videoUrl ? (
      <video src={videoUrl} controls className="rounded-md" />
    ) : (
      <p>No hay video</p>
    )}

    <div className="mt-4 p-2 rounded-md border">
      <Button variant="secondary" onClick={() => setOnEditVideo(true)}>
        {onEditVideo ? "Arrastra o selecciona el video" : "Editar video"}

        <Pencil className="w-4 h-4" />
      </Button>

      {onEditVideo && (
        <UploadButton
          className="w-full bg-slate-200 rounded-md p-2 mt-2"
          endpoint="chapterVideo"
          onClientUploadComplete={(url) => {
            console.log(url)

            if(url) {
              onsubmit(url[0].serverData.url)
            }
          }}
          />
      )}
    </div>
  </div>
}
