'use client'

import { useState, useEffect, useRef } from 'react'
import { Folder, Star, Trash2, Clock, Users, HardDrive, Plus, ChevronDown, FolderPlus, Upload, FileText, Image, Video, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const menuItems = [
  { id: 'my-drive', name: 'Meu Drive', icon: HardDrive, active: true },
  { id: 'shared', name: 'Compartilhados', icon: Users, count: 12 },
  { id: 'shared-drives', name: 'Drives Compartilhados', icon: Folder, count: 5 },
  { id: 'starred', name: 'Favoritos', icon: Star, count: 8 },
  { id: 'recent', name: 'Recentes', icon: Clock },
  { id: 'trash', name: 'Lixeira', icon: Trash2, count: 3 },
]

interface SidebarProps {
  currentView?: string
  onViewChange?: (view: string) => void
}

export function Sidebar({ currentView = 'my-drive', onViewChange }: SidebarProps) {
  const [showNewMenu, setShowNewMenu] = useState(false)
  const newMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newMenuRef.current && !newMenuRef.current.contains(event.target as Node)) {
        setShowNewMenu(false)
      }
    }

    if (showNewMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNewMenu])

  return (
    <aside className="w-72 border-r bg-muted/10 h-[calc(100vh-3.5rem)] fixed left-0 top-14 z-30">
      <div className="h-full flex flex-col">
        <div className="p-4 relative" ref={newMenuRef}>
          <Button 
            className="w-full justify-between gap-2"
            onClick={() => setShowNewMenu(!showNewMenu)}
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showNewMenu && (
            <div className="absolute top-12 left-4 right-4 bg-card border rounded-lg shadow-lg z-50 py-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md">
                <FolderPlus className="h-4 w-4 text-blue-600" />
                Nova Pasta
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md">
                <Upload className="h-4 w-4 text-green-600" />
                Upload de Arquivo
              </button>
              <hr className="my-2" />
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md">
                <FileText className="h-4 w-4 text-blue-600" />
                Documento
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md">
                <Image className="h-4 w-4 text-green-600" />
                Imagem
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md">
                <Video className="h-4 w-4 text-red-600" />
                Vídeo
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md">
                <Music className="h-4 w-4 text-purple-600" />
                Áudio
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange?.(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  
                  {item.count && (
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isActive 
                        ? "bg-primary-foreground/20 text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Storage Usage */}
          <div className="mt-8 p-3 bg-card rounded-lg border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Armazenamento
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Usado</span>
                <span>8.5 GB de 15 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '57%' }}></div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Solicitar mais espaço
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}