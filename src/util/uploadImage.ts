/**
 * Uploads an image file to Cloudinary through the /api/upload route handler.
 * Resolves with the hosted image URL.
 */
export default function uploadImage(file: File, folder: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result, folder }),
        });
        const data = await response.json();
        if (!response.ok || !data.imageUrl) {
          throw new Error(data.error || "Failed to upload image");
        }
        resolve(data.imageUrl);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
  });
}
