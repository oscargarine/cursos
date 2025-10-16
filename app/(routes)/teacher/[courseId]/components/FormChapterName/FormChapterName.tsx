"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { FormChapterNameProps } from "./FormChapterName.types"
import { formSchema } from "./FormChapterName.form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios from "axios"

export function FormChapterName(props: FormChapterNameProps) {
  const { idCourse, setShowInputChapter } = props

  const router = useRouter()

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      axios.post(`/api/course/${idCourse}/chapter`, {
        title: values.title
      })

      toast("Capitulo creado.")
      setShowInputChapter(false)
      router.refresh()
    } catch (error) {
      toast.error("Hubo un error al crear el capítulo")
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ej: Introduccion a la programación" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>Crear</Button>
      </form>
    </Form>    
  )
}

