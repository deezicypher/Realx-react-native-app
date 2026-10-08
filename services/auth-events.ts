type AuthFailureListener = () => void

const listeners = new Set<AuthFailureListener>()

export function subscribeToAuthFailure(listener: AuthFailureListener): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function notifyAuthFailure() {
  listeners.forEach((listener) => listener())
}
