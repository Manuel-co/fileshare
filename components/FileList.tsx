"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, ImageIcon, VideoIcon, Music2Icon, FileTextIcon, ArchiveIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { ShareDialog } from "./ShareDialog";

interface StoredFile {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
}

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fileShareDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
    };
  });
};

function getFileIcon(type: string | undefined) {
  // Return default icon if type is undefined or empty
  if (!type) return <FileIcon className="w-5 h-5" />;

  try {
    const lowerType = type.toLowerCase();
    if (lowerType.startsWith('image/')) return <ImageIcon className="w-5 h-5" />;
    if (lowerType.startsWith('video/')) return <VideoIcon className="w-5 h-5" />;
    if (lowerType.startsWith('audio/')) return <Music2Icon className="w-5 h-5" />;
    if (lowerType === 'application/pdf') return <FileTextIcon className="w-5 h-5" />;
    if (lowerType.includes('zip') || lowerType.includes('rar')) return <ArchiveIcon className="w-5 h-5" />;
  } catch (error) {
    console.error('Error determining file icon:', error);
  }
  
  return <FileIcon className="w-5 h-5" />;
}

function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function FileList() {
  const [files, setFiles] = useState<StoredFile[]>([]);

  const loadFiles = async () => {
    try {
      const db = await initDB() as IDBDatabase;
      return new Promise<StoredFile[]>((resolve, reject) => {
        const transaction = db.transaction(['files'], 'readonly');
        const store = transaction.objectStore('files');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error loading files:', error);
      return [];
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      const db = await initDB() as IDBDatabase;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(fileId);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      
      // Refresh the file list
      const updatedFiles = await loadFiles();
      setFiles(updatedFiles);
      toast.success("File deleted");
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Failed to delete file");
    }
  };

  useEffect(() => {
    loadFiles().then(files => setFiles(files));
  }, []);

  if (files.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <FileIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No files uploaded</h3>
          <p>Upload files to share them with others</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="divide-y divide-gray-200 dark:divide-gray-800">
      {files.map((file) => (
        <div key={file.id} className="p-4 flex items-center gap-4">
          <div className="text-blue-500 dark:text-blue-400">
            {getFileIcon(file.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatFileSize(file.size)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ShareDialog fileId={file.id} fileName={file.name} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(file.id)}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2Icon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ))}
    </Card>
  );
} 