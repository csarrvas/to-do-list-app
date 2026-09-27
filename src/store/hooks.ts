import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/store'

// Use these instead of the plain react-redux hooks: they know the app's types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
