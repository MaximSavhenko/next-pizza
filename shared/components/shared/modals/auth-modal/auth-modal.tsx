import { Button } from '@/shared/components/ui'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { signIn } from 'next-auth/react'
import React from 'react'
import { LoginForm } from '../form/login-form'
import { RegisterForm } from '../form/register-form'

interface Props {
  className?: string
  open: boolean
  onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ className, open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px]  bg-white p-10">
        <DialogTitle className="hidden" />
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="Github"
            />
            Github
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google"
            />
            Google
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={onSwitchType}
          type="button"
          className="h-12"
        >
<<<<<<< HEAD
          {type === 'login' ? 'Вход' : 'Регистрация'}
=======
          {type === 'login' ? 'Регистрация' : ' Вход'}
>>>>>>> refs/remotes/origin/main
        </Button>
      </DialogContent>
    </Dialog>
  )
}
