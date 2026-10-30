import { Paperclip, Upload, X } from "lucide-react"
import { forwardRef, useRef, useState, type ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/button"

type FileDropzoneProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "onChange" | "multiple"
> & {
  files: File[]
  onFilesChange: (files: File[]) => void
}

export const FileDropzone = forwardRef<HTMLInputElement, FileDropzoneProps>(
  ({ files, onFilesChange, disabled, ...inputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    function updateFiles(incoming: File[]) {
      const next = [...files]
      for (const file of incoming) {
        if (
          !next.some(
            (item) =>
              item.name === file.name &&
              item.size === file.size &&
              item.lastModified === file.lastModified,
          )
        ) {
          next.push(file)
        }
      }
      if (next.length !== files.length) onFilesChange(next)
    }

    return (
      <>
        <input
          {...inputProps}
          type="file"
          multiple
          disabled={disabled}
          ref={(element) => {
            inputRef.current = element
            if (typeof ref === "function") ref(element)
            else if (ref) ref.current = element
          }}
          onChange={(event) => {
            updateFiles(Array.from(event.target.files ?? []))
            event.target.value = ""
          }}
          tabIndex={-1}
          className="sr-only"
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(event) => {
            event.preventDefault()
            event.dataTransfer.dropEffect = "copy"
          }}
          onDragLeave={(event) => {
            event.preventDefault()
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsDragging(false)
            }
          }}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            if (!disabled) updateFiles(Array.from(event.dataTransfer.files))
          }}
          className={cn(
            "flex min-h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background px-5 py-6 text-center transition-colors hover:border-primary hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
            isDragging && "border-primary bg-secondary/60",
          )}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
            <Upload aria-hidden="true" className="size-6" />
          </span>
          <span className="font-semibold">
            Arraste arquivos aqui ou clique para selecionar
          </span>
          <span className="text-sm text-muted-foreground">
            Você pode adicionar vários arquivos.
          </span>
        </button>
        {files.length > 0 && (
          <ul className="space-y-2" aria-label="Anexos selecionados">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}-${index}`}
                className="flex min-w-0 items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-md"
              >
                <Paperclip
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                <span className="min-w-0 flex-1 truncate" title={file.name}>
                  {file.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled}
                  className="size-8 shrink-0 text-muted-foreground"
                  aria-label={`Remover ${file.name}`}
                  onClick={() =>
                    onFilesChange(
                      files.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  <X aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  },
)
FileDropzone.displayName = "FileDropzone"
