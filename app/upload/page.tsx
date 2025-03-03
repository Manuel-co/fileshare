"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { FileList } from "@/components/FileList";

export default function UploadPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshFiles = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Upload Files</h1>
        <p className="text-muted-foreground">
          Drag and drop your files here or click to browse. We support all file types.
        </p>
      </div>

      <FileUpload onUploadSuccess={refreshFiles} />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Uploads</h2>
        <FileList key={refreshKey} />
      </div>
    </div>
  );
} 