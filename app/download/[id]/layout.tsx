import { notFound } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function PreviewLayout({ 
  children, 
  params 
}: LayoutProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return children;
} 