import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [state, setState] = useState({ open: false, service: '', session: 0 })

  const openBooking = useCallback((service = '') => {
    setState((current) => ({ open: true, service, session: current.session + 1 }))
  }, [])

  const closeBooking = useCallback(() => {
    setState((current) => ({ ...current, open: false }))
  }, [])

  const value = useMemo(() => ({ ...state, openBooking, closeBooking }), [state, openBooking, closeBooking])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used inside BookingProvider')
  return context
}
