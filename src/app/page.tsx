'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { DriveView } from '@/components/drive/drive-view'

export default function DrivePage() {
  const [currentView, setCurrentView] = useState('my-drive')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const renderView = () => {
    switch (currentView) {
      case 'my-drive':
        return <DriveView />
      case 'shared':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Compartilhados Comigo</h1>
            <p className="text-muted-foreground">Arquivos compartilhados por outros usuários</p>
          </div>
        )
      case 'shared-drives':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Drives Compartilhados</h1>
            <p className="text-muted-foreground">Drives compartilhados da organização</p>
          </div>
        )
      case 'starred':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Favoritos</h1>
            <p className="text-muted-foreground">Seus arquivos marcados como favoritos</p>
          </div>
        )
      case 'recent':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Recentes</h1>
            <p className="text-muted-foreground">Arquivos acessados recentemente</p>
          </div>
        )
      case 'trash':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Lixeira</h1>
            <p className="text-muted-foreground">Arquivos excluídos</p>
          </div>
        )
      default:
        return <DriveView />
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 ml-72 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  )
}