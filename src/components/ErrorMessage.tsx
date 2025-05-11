import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <div>
        {children}
    </div>
  )
}

export default ErrorMessage