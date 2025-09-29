import { Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormCreateCourse } from "./FormCreateCourse"


export function Header() {
  return (
    <div className="my-4 mx-6 border rounded-lg bg-white">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl">Teacher mode</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Crear curso
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crea tu curso</DialogTitle>
                
                <FormCreateCourse />
              </DialogHeader>
            </DialogContent>
          </Dialog>

      </div>
    </div>
  )
}

