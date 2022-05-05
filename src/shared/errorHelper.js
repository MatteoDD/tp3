import AppError from '@/shared/AppError'

export function parseAxiosErrorToAppError(error) {
 if(isNetworkError(error)) {
     const appError = new AppError('Erreur avec le réseau, impossible de se connecter au serveur')
     return appError
 } else {
    const appError = new AppError(
        error.response.data,
        error.response.statusText,
        error.response.status
    )
    return appError
   }
}
