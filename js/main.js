// Event listener for file input change
document.getElementById('file-input').addEventListener('change', handleFileChange);

// Function to handle file input change event
function handleFileChange(event) {

  const files = event.target.files;
  const container = document.getElementById('image-container');

  console.log(files, container);

  container.innerHTML = '';

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      // console.log(imageUrl)
      const thumbnail = document.createElement('div');
      thumbnail.classList.add('thumbnail');

      const image = document.createElement('img');
      image.src = imageUrl;

      thumbnail.appendChild(image);
      container.appendChild(thumbnail);
    };

    reader.readAsDataURL(file);
  }
}

// Event listener for upload button click
document.getElementById('upload-btn').addEventListener('click', handleUpload);

// Function to handle upload button click event
function handleUpload() {
  const thumbnails = document.getElementsByClassName('thumbnail');

  const formData = new FormData();



  for (let i = 0; i < thumbnails.length; i++) {
    const image = thumbnails[i].querySelector('img');
    const dataUrl = image.src;

    // const croppedImage = getCroppedImage(dataUrl);
    const croppedFile = dataURLtoFile(dataUrl, `cropped_${i}.jpg`);
    formData.append(`image-${i}`, croppedFile);
    // console.log(formData.get(`image-${i}`));
  }

  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'server.php', true);
  // xhr.setRequestHeader('content-type', 'multipart/form-data');
  xhr.send(formData);

  // console.log(xhr, formData);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log('Upload successful');
        // Handle successful upload
      } else {
        console.log('Upload failed');
        // Handle upload failure
      }
    }
  };
}

// Function to get cropped image using cropper.js library
function getCroppedImage(dataUrl) {
  // Implement cropper.js library integration
  // Return cropped image data URL
}

// Function to convert data URL to File object
function dataURLtoFile(dataURL, filename) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);

  let n = bstr.length;

  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
    // console.log(n);
  }

  const file = new File([u8arr], filename, { type: mime });

  // console.log(file);

  return file;
}
