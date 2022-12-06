const image_input = document.querySelector("#image-input");

function clickImage() {
  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      document.querySelector(
        "#display-image"
      ).style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
  });
}

function clickImage1() {
  $("#profileImage").click(function (e) {
    $("#imageUpload").click();
  });

  function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
      $("#profileImage").attr(
        "src",
        window.URL.createObjectURL(uploader.files[0])
      );
    }
  }

  $("#imageUpload").change(function () {
    fasterPreview(this);
  });
}
