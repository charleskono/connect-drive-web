'use client'

import { useState } from 'react'
import { Grid, List, Upload, FolderPlus, MoreVertical, Download, Share, Star, Trash2, File, Folder, Image, FileText, Music, Video, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DriveView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const files = [
    { id: 1, name: 'Documentos', type: 'folder', size: null, modified: '2024-01-15', shared: false, starred: false },
    { id: 2, name: 'Fotos Férias', type: 'folder', size: null, modified: '2024-01-14', shared: true, starred: true },
    { id: 3, name: 'Relatório Q4.pdf', type: 'pdf', size: '2.4 MB', modified: '2024-01-13', shared: false, starred: false },
    { id: 4, name: 'Apresentação.pptx', type: 'presentation', size: '8.1 MB', modified: '2024-01-12', shared: true, starred: false },
    { id: 5, name: 'Planilha Vendas.xlsx', type: 'spreadsheet', size: '1.2 MB', modified: '2024-01-11', shared: false, starred: true },
    { id: 6, name: 'foto-perfil.jpg', type: 'image', size: '856 KB', modified: '2024-01-10', shared: false, starred: false },
    { id: 7, name: 'video-demo.mp4', type: 'video', size: '45.2 MB', modified: '2024-01-09', shared: false, starred: false },
    { id: 8, name: 'musica.mp3', type: 'audio', size: '4.8 MB', modified: '2024-01-08', shared: false, starred: false }
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="h-8 w-8 text-blue-600" />
      case 'image': return <Image className="h-8 w-8 text-green-600" />
      case 'video': return <Video className="h-8 w-8 text-red-600" />
      case 'audio': return <Music className="h-8 w-8 text-purple-600" />
      case 'pdf': return <FileText className="h-8 w-8 text-red-600" />
      default: return <File className="h-8 w-8 text-gray-600" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meu Drive</h1>
          <p className="text-muted-foreground">Gerencie seus arquivos e pastas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline" size="sm">
            <FolderPlus className="h-4 w-4 mr-2" />
            Nova Pasta
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Files Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-6 gap-4">
          {files.map((file) => (
            <div key={file.id} className="group bg-card border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer relative">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  {getFileIcon(file.type)}
                  {file.starred && (
                    <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 fill-current" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium truncate w-full" title={file.name}>
                    {file.name}
                  </p>
                  {file.size && (
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Nome</th>
                <th className="text-left p-4 font-medium">Modificado</th>
                <th className="text-left p-4 font-medium">Tamanho</th>
                <th className="text-left p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-t hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{file.name}</span>
                          {file.shared && <Users className="h-3 w-3 text-blue-600" />}
                          {file.starred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{file.modified}</td>
                  <td className="p-4 text-muted-foreground">{file.size || '—'}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}