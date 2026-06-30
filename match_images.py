import os
from pypdf import PdfReader
from PIL import Image
import io

def match_images():
    pdf_path = r"src/ref/BMCL Company Profile.pdf"
    ref_dir = r"src/ref"
    
    # Load all ref images and downsample them for fast comparison
    ref_images = []
    ref_files = [f for f in os.listdir(ref_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    print("Loading reference images...")
    for f in ref_files:
        path = os.path.join(ref_dir, f)
        try:
            with Image.open(path) as img:
                # Convert to grayscale and resize to 16x16 for a simple hash
                small = img.convert('L').resize((16, 16), Image.Resampling.LANCZOS)
                pixels = list(small.getdata())
                ref_images.append({
                    'filename': f,
                    'pixels': pixels,
                    'original_size': img.size
                })
        except Exception as e:
            print(f"Error loading {f}: {e}")
            
    print(f"Loaded {len(ref_images)} reference images.")
    
    # Read PDF
    print(f"Reading PDF: {pdf_path}...")
    reader = PdfReader(pdf_path)
    
    for page_idx, page in enumerate(reader.pages):
        page_num = page_idx + 1
        print(f"\n--- Page {page_num} has {len(page.images)} images ---")
        
        for img_idx, image_file_object in enumerate(page.images):
            img_data = image_file_object.data
            try:
                pdf_img = Image.open(io.BytesIO(img_data))
                pdf_small = pdf_img.convert('L').resize((16, 16), Image.Resampling.LANCZOS)
                pdf_pixels = list(pdf_small.getdata())
                
                # Find the best match in reference images by calculating mean squared error
                best_match = None
                min_mse = float('inf')
                
                for ref in ref_images:
                    mse = sum((p1 - p2) ** 2 for p1, p2 in zip(pdf_pixels, ref['pixels'])) / 256.0
                    if mse < min_mse:
                        min_mse = mse
                        best_match = ref
                
                # Threshold for matching: typical MSE for similar images is < 1000
                if best_match and min_mse < 1500:
                    print(f"  Extracted Image {img_idx+1} ({pdf_img.size[0]}x{pdf_img.size[1]}) matches {best_match['filename']} (MSE: {min_mse:.1f})")
                else:
                    print(f"  Extracted Image {img_idx+1} ({pdf_img.size[0]}x{pdf_img.size[1]}) NO GOOD MATCH (best MSE: {min_mse:.1f} with {best_match['filename'] if best_match else 'None'})")
            except Exception as e:
                print(f"  Error processing image {img_idx+1}: {e}")

if __name__ == "__main__":
    match_images()
