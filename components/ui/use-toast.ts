// Inspired by react-hot-toast library
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  [key: string]: any
}

const toast = (props: ToastProps) => {
  const { title, description, ...rest } = props

  return sonnerToast(title, {
    description,
    ...rest,
  })
}

export { toast }
