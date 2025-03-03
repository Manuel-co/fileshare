import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create unique filename
    const uniqueFilename = `${randomUUID()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Save to uploads directory
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    await writeFile(join(uploadsDir, uniqueFilename), buffer);

    // Return the file URL
    const fileUrl = `/uploads/${uniqueFilename}`;
    
    return NextResponse.json({
      url: fileUrl,
      name: file.name,
      type: file.type,
      size: file.size
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// Configure body parser to handle large files
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false
  }
}; 