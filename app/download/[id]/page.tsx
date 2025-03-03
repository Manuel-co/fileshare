import { Suspense } from "react";
import FilePreviewContent from "./FilePreviewContent";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return {
    title: 'Download File',
    description: 'Download your shared file',
  };
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense
        fallback={
          <div className="container mx-auto py-8 px-4">
            <Card className="max-w-5xl mx-auto overflow-hidden">
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
        }
      >
        <FilePreviewContent fileId={id} />
      </Suspense>
    </div>
  );
} 