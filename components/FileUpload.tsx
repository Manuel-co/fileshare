"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

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

interface FileUploadProps {
  onUploadSuccess: () => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const storeFile = async (fileData: { id: string, url: string, name: string, type: string, size: number }) => {
    try {
      const db = await initDB() as IDBDatabase;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['files'], 'readwrite');
        const store = transaction.objectStore('files');
        const request = store.put({
          ...fileData,
          downloads: 0,
          uploadedAt: new Date().toISOString()
        });

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error storing file:', error);
      return false;
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Read file as data URL
      const reader = new FileReader();
      
      reader.onload = async function(e) {
        try {
          const fileUrl = e.target?.result as string;
          const fileId = Math.random().toString(36).substring(2, 15);
          const fileData = {
            id: fileId,
            url: fileUrl,
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size
          };

          const stored = await storeFile(fileData);
          
          if (!stored) {
            throw new Error('Storage failed');
          }
          
          // Complete the progress bar
          setUploadProgress(100);
          setTimeout(() => {
            setSelectedFile(null);
            setUploadProgress(0);
            setUploading(false);
            clearInterval(progressInterval);
            toast.success("File uploaded successfully!");
            onUploadSuccess();
          }, 500);
        } catch (error) {
          console.error('Error saving file:', error);
          toast.error("Failed to store file. Please try again.");
          setUploading(false);
          clearInterval(progressInterval);
        }
      };

      reader.onerror = function() {
        console.error('Error reading file');
        toast.error("Failed to read file");
        setUploading(false);
        clearInterval(progressInterval);
      };

      // Start reading the file
      reader.readAsDataURL(selectedFile);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to process file");
      setUploading(false);
    }
  };

  // Initialize DB when component mounts
  useEffect(() => {
    initDB().catch(error => {
      console.error('Failed to initialize database:', error);
      toast.error("Failed to initialize storage");
    });
  }, []);

  const cancelUpload = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <Card className="p-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
          ${selectedFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
        `}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Selected file:</p>
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="space-y-2">
              <p className="text-gray-500 dark:text-gray-400">
                {isDragActive ? (
                  "Drop the file here"
                ) : (
                  "Drag and drop a file here, or click to select"
                )}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Any file type is supported
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="mt-4 space-y-4">
          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Processing... {uploadProgress.toFixed(0)}%
              </p>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button
              onClick={uploadFile}
              className="flex-1"
              disabled={uploading}
            >
              {uploading ? "Processing..." : "Upload File"}
            </Button>
            <Button
              onClick={cancelUpload}
              variant="outline"
              disabled={uploading}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
} 