import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return NextResponse.json({ error: "Only jpg, png, and webp are supported." }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be smaller than 10 MB." }, { status: 400 });
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  // Upload to Supabase Storage
  const { data: storageData, error: storageError } = await supabaseAdmin.storage
    .from("product-ad-media")
    .upload(filePath, file);

  if (storageError) {
    return NextResponse.json({ error: "Failed to upload image to storage." }, { status: 500 });
  }

  // Record asset in a generic way (we use the storage path as assetId for now)
  // or return a signed URL/public URL
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from("product-ad-media")
    .getPublicUrl(filePath);

  return NextResponse.json({
    assetId: crypto.randomUUID(), // For DB reference
    storagePath: filePath,
    publicUrl,
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
  });
}
