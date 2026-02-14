import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import type {
  SignInParams,
  SignUpParams
} from '@/domain/repositories/auth-repository'

import { makeAuthRepository } from '@/infrastructure/factories/make-auth-repository'

import { queryAdapter } from '@/shared/utils/query-adapter'

import { authKeys } from '@/presentation/hooks/query-keys'

const repository = makeAuthRepository()

export const useSession = () => {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: () => queryAdapter(repository.getSession())
  })
}

export const useSignIn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SignInParams) =>
      queryAdapter(repository.signInWithEmail(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}

export const useSignUp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SignUpParams) =>
      queryAdapter(repository.signUp(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}

export const useSignOut = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => queryAdapter(repository.signOut()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}
