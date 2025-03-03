"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, ImageIcon, VideoIcon, Music2Icon, FileTextIcon, ArchiveIcon, Trash2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface StoredFile {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  downloads: number;
  uploadedAt: string;
}

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fileShareDB', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export default function FilesPage() {
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

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />;
    if (type.startsWith('video/')) return <VideoIcon className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <Music2Icon className="w-6 h-6" />;
    if (type.startsWith('text/')) return <FileTextIcon className="w-6 h-6" />;
    if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return <ArchiveIcon className="w-6 h-6" />;
    return <FileIcon className="w-6 h-6" />;
  };

  useEffect(() => {
    loadFiles().then(files => {
      // Sort files by upload date (newest first)
      const sortedFiles = files.sort((a, b) => 
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
      setFiles(sortedFiles);
    });
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Files</h1>
      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-gray-500 dark:text-gray-400">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{file.name}</h3>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{file.downloads} downloads</span>
                  <span>•</span>
                  <span>Uploaded {formatDistanceToNow(new Date(file.uploadedAt))} ago</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={() => handleDelete(file.id)}
              >
                <Trash2Icon className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 