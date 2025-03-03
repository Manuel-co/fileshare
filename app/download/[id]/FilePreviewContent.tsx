"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  DownloadIcon, 
  FileIcon, 
  ImageIcon, 
  VideoIcon, 
  Music2Icon, 
  FileTextIcon, 
  ArchiveIcon,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface FilePreviewContentProps {
  fileId: string;
}

interface FileData {
  url: string;
  name: string;
  type: string;
  size?: number;
  downloads?: number;
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

function formatFileSize(bytes?: number): string {
  if (!bytes) return 'Unknown size';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith('image')) return <ImageIcon className="w-6 h-6 text-blue-500" />;
  if (type.startsWith('video')) return <VideoIcon className="w-6 h-6 text-blue-500" />;
  if (type.startsWith('audio')) return <Music2Icon className="w-6 h-6 text-blue-500" />;
  if (type.includes('pdf')) return <FileTextIcon className="w-6 h-6 text-blue-500" />;
  if (type.includes('zip') || type.includes('rar')) return <ArchiveIcon className="w-6 h-6 text-blue-500" />;
  return <FileIcon className="w-6 h-6 text-blue-500" />;
}

export default function FilePreviewContent({ fileId }: FilePreviewContentProps) {
  const [file, setFile] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const db = await initDB() as IDBDatabase;
        const transaction = db.transaction(['files'], 'readonly');
        const store = transaction.objectStore('files');
        
        const fileData = await new Promise<FileData>((resolve, reject) => {
          const request = store.get(fileId);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
        
        if (fileData) {
          setFile(fileData);
        }
      } catch (err) {
        console.error('Error loading file data:', err);
        toast.error("Failed to load file");
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [fileId]);

  const handleDownload = async () => {
    if (!file) return;
    
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      // Increment download count
      const db = await initDB() as IDBDatabase;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      const request = store.get(fileId);
      
      request.onsuccess = () => {
        const fileData = request.result;
        if (fileData) {
          fileData.downloads = (fileData.downloads || 0) + 1;
          store.put(fileData);
        }
      };

      toast.success("Download started");
    } catch (err) {
      console.error('Download error:', err);
      toast.error("Failed to download file");
    }
  };

  if (loading) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <Card className="overflow-hidden">
          <div className="p-6 border-b">
            <div className="animate-pulse flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="flex-1">
                <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <Card className="overflow-hidden">
          <div className="p-16 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold">File Not Found</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              This file may have expired or been removed. Please check the link and try again.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Card className="overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            {getFileIcon(file.type)}
            <div className="min-w-0">
              <h1 className="text-xl font-semibold truncate">{file.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 space-x-2">
                <span>{file.type}</span>
                <span>•</span>
                <span>{formatFileSize(file.size)}</span>
              </p>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 shrink-0"
            size="lg"
          >
            <DownloadIcon className="w-4 h-4" />
            Download File
          </Button>
        </div>

        <div className="p-8">
          <div className="rounded-lg overflow-hidden border bg-card">
            {file.type.startsWith('image') ? (
              <div className="relative bg-black/5 dark:bg-white/5 flex items-center justify-center min-h-[400px]">
                <Image
                  src={file.url}
                  alt={file.name}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[600px] object-contain"
                />
              </div>
            ) : file.type.startsWith('video') ? (
              <div className="aspect-video bg-black">
                <video
                  src={file.url}
                  controls
                  className="w-full h-full"
                />
              </div>
            ) : file.type.startsWith('audio') ? (
              <div className="p-8 bg-black/5 dark:bg-white/5">
                <audio
                  src={file.url}
                  controls
                  className="w-full"
                />
              </div>
            ) : file.type === 'application/pdf' ? (
              <iframe
                src={file.url}
                className="w-full h-[600px] border-0"
                title={file.name}
              />
            ) : (
              <div className="p-16 flex flex-col items-center gap-4 text-center bg-black/5 dark:bg-white/5">
                <FileIcon className="w-16 h-16 text-gray-400" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    This file requires an external application to open.
                    <br />
                    Click the button below to download.
                  </p>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download {formatFileSize(file.size)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 