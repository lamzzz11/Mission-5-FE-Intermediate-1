import { useMediaQuery } from 'react-responsive'

export const MOBILE_BREAKPOINT = 768

export default function useIsMobile() {
  return useMediaQuery({ maxWidth: MOBILE_BREAKPOINT })
}
