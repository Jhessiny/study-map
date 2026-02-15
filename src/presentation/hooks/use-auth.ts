import { useContext } from 'react'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import type {
  SignInParams,
  SignUpParams
} from '@/domain/repositories/auth-repository'

import { AuthContext } from '@/main/contexts/auth-context'

import { queryAdapter } from '@/shared/utils/query-adapter'

import { authKeys } from '@/presentation/hooks/query-keys'

const useAuthUseCases = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthUseCases must be used within an AuthProvider')
  }

  return context
}

export const useSession = () => {
  const { getSession } = useAuthUseCases()

  return useQuery({
    queryKey: authKeys.session,
    queryFn: () => queryAdapter(getSession.execute())
  })
}

export const useSignIn = () => {
  const { signIn } = useAuthUseCases()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SignInParams) => queryAdapter(signIn.execute(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}

export const useSignUp = () => {
  const { signUp } = useAuthUseCases()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SignUpParams) => queryAdapter(signUp.execute(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}

export const useSignOut = () => {
  const { signOut } = useAuthUseCases()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => queryAdapter(signOut.execute()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}
