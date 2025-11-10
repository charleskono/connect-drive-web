'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, User, Moon, Sun, HardDrive, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(theme === 'dark' || (!theme && systemDark))
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center group cursor-pointer">
            <div className="flex items-center relative">
              {/* Connect */}
              <div className="flex items-center mr-2 connect-impact -space-x-4 dark:ml-4">
                <img src="/images/logotipo-co-2.png" alt="CO" className="h-12 w-auto dark:hidden group-hover:hidden connect-impact transition-all duration-300" />
                <img src="/images/logotipo-co-3.png" alt="CO" className="h-12 w-auto hidden dark:block group-hover:hidden connect-impact transition-all duration-300 ml-4" />
                <img src="/images/logotipo-co-1.png" alt="CO" className="h-12 w-auto hidden group-hover:block connect-impact transition-all duration-300" />
                <span className="font-bold text-2xl text-gray-700 dark:text-gray-300 tracking-wide group-hover:text-blue-500 transition-colors duration-300">nnect</span>
              </div>
              
              {/* Drive + icon */}
              <div className="flex items-center">
                <span className="font-bold text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300">Drive</span>
                <HardDrive className="h-4 w-4 text-blue-500 ml-1 mail-bounce" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar arquivos e pastas..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <User className="w-4 h-4 text-primary" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-10 w-64 bg-card border rounded-lg shadow-lg p-4 z-[99999]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Usuário</div>
                    <div className="text-xs text-muted-foreground">usuario@connectmail.com</div>
                  </div>
                </div>
                <hr className="my-3" />
                <button 
                  onClick={() => window.location.href = '/logout'}
                  className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}