// ✅ File: ErrorMessage.jsx
import { usePage } from '@inertiajs/react'

const ErrorMessage = () => {
  const { props } = usePage()
  const errors = props.errors || {}

  return (
    errors.upload && <p className="text-red-500">{errors.upload}</p>
  )
}

// ✅ Export secara default
export default ErrorMessage
