import html2pdf from "html2pdf.js";

/* const loadImagesAsync = (images) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable cross-origin if needed
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png'); // Convert to base64
          resolve(dataUrl); // Resolve with base64 string
        };
        img.onerror = () => reject('Error loading image: ' + images);
        img.src = images; // Trigger image loading
      });
}; 
loadImagesAsync(allImages).then(() => {
            // All images are loaded, now generate the PDF
        html2pdf().set(pdfOptions).from(element).save();

        }).catch(error => {
            console.error("Error loading images:", error);
        });
*/

const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous"; // Enable cross-origin for public URLs if needed
        img.onload = () => resolve(url); // Resolve when the image is loaded
        img.onerror = reject;
    });
};

/* 
await Promise.all(mockups.flatMap(mockup => ['https://picsum.photos/id/866/536/354.jpg'].map(preloadImage)));
 ${
    ['https://picsum.photos/id/866/536/354.jpg'].map(image => {
        // allImages.push(image);
        return `<img src="https://picsum.photos/id/866/536/354.jpg" alt="Mockup Image" style="width: 100%; margin-bottom: 10px;"/>`
    }).join('')
}
*/

const generatePdf = async (mockups) => {
    const allImages = []
    
    console.log('mockups', mockups);
    if (mockups.length) {
        await Promise.all(mockups.flatMap(mockup => mockup.images.map(preloadImage)));
        const htmlString = mockups.map(mockup => {
            const htmlString =  `
                <div class="container-fluid p-4" style="page-break-after: always;">
                    <header class="d-flex justify-content-between align-items-center mb-4">
                        <div class="mt-3 d-flex align-items-center">
                            <h5>${mockup.title}</h5>
                        </div>
                    </header>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="bg-light p-3 rounded">
                                ${
                                    mockup.images.map(image => {
                                        // allImages.push(image);
                                        return `<img src="${image}" alt="Mockup Image" style="width: 100%; margin-bottom: 10px;"/>`
                                    }).join('')
                                }
                            </div >
                        </div >

                        <div class="col-md-4">
                            <h5 class="mt-4">${mockup?.domainname} | ${mockup?.subdomainname}</h5>
                            <p>${mockup?.projectDescription}</p>

                            <h5 class="mt-4">Tags</h5>
                            <p>${mockup.tags.map(tag => `<span style="background-color: #6c757d; color: white; padding: 5px; border-radius: 3px; margin-right: 5px;">${tag}</span>`).join('')}</p>

                            <h5 class="mt-4">About Project</h5>
                            <p>${mockup.description}</p>

                            <h5 class="mt-4">About Screen</h5>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                        </div>
                    </div >
                </div >
            `
        return htmlString
        }).join('');

        const pdfOptions = {
            margin: 0.2,
            filename: "mockups.pdf",
            image: { type: "png", quality: 0.98 },
            html2canvas: { scale: 2},
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
        };

        const element = document.createElement("div");
        element.innerHTML = htmlString;
        html2pdf().set(pdfOptions).from(element).save();
    }
};

export default generatePdf;