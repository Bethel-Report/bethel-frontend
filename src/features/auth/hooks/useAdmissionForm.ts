import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { apiRequest, ApiError } from "@/shared/api/client"
import { admissionSchema } from "../schemas"
import type { Admission, AdmissionStatus, Profile } from "../types"
import { useAuth } from "./useAuth"

export function useAdmissionForm() {
  const { updateProfile } = useAuth()
  const sending = useRef(false)
  const mounted = useRef(true)

  const [status, setStatus] = useState<AdmissionStatus>("editing")
  const [message, setMessage] = useState("")

  const form = useForm<Admission>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      name: "",
      birthday: "",
      city: "",
      address: "",
      volunteer: false,
      masonicRelationship: false,
      member: false,
      sponsorship: false,
    },
  })

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  async function checkRegistration(completed: boolean) {
    setStatus("checking")

    try {
      const profile = await apiRequest<Profile>("/api/users/me")

      if (!mounted.current) return

      updateProfile(profile)
    } catch (error) {
      if (!mounted.current) return

      if (error instanceof ApiError && error.status === 404 && !completed) {
        setStatus("editing")
        setMessage(
          "O cadastro ainda não foi concluído. Confira os dados e tente novamente.",
        )
        return
      }

      if (error instanceof ApiError && [401, 403].includes(error.status)) {
        setStatus("forbidden")
        setMessage(
          error.status === 401
            ? "Sua sessão terminou. Entre novamente."
            : "Acesso não permitido. Consulte a administração ou troque de conta.",
        )
        return
      }

      setStatus(completed ? "saved" : "uncertain")
      setMessage(
        completed
          ? "Seu cadastro foi salvo, mas não foi possível carregar seu perfil. Tente continuar novamente."
          : "Não foi possível confirmar o cadastro. Verifique o resultado antes de enviar novamente.",
      )
    }
  }

  async function submit(data: Admission) {
    if (sending.current || status !== "editing") return

    sending.current = true
    setStatus("submitting")
    setMessage("")

    try {
      await apiRequest("/api/admission/complete", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (!mounted.current) return

      await checkRegistration(true)
    } catch (error) {
      if (!mounted.current) return

      if (
        !(error instanceof ApiError) ||
        error.status === 409 ||
        error.status >= 500
      ) {
        await checkRegistration(false)
        return
      }

      if (error.status === 400) {
        for (const [field, message] of Object.entries(error.errors || {})) {
          if (Object.hasOwn(admissionSchema.shape, field)) {
            form.setError(field as keyof Admission, { message })
          }
        }
      }

      setStatus([401, 403].includes(error.status) ? "forbidden" : "editing")
      setMessage(
        error.status === 403
          ? "Acesso não permitido. Consulte a administração ou troque de conta."
          : error.message,
      )
    } finally {
      sending.current = false
    }
  }

  function retryProfile() {
    if (status !== "saved" && status !== "uncertain") return

    return checkRegistration(status === "saved")
  }

  return {
    form,
    status,
    message,
    submit,
    retryProfile,
  }
}
