<template>
  <h1>
    Account
  </h1>
  <form action="/upload" enctype="multipart/form-data">
    <input name="myFile" id="image-file" type="file">
    <button type="button" @click="send('image-file')">Upload</button>
  </form>
  <div class="image">
    <canvas class="uploadImage" id="uploadImage"></canvas>
    <canvas class="phoneCanvas" id="phoneCanvas" @mousedown="down($event)" @mouseup="up($event)"
            @mousemove="move($event)"></canvas>
  </div>
  <div id="img" class="sub" style="border:1px solid purple"></div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      imageMaxWidth: 600,
      md: false,
      start: {
        x: -1,
        y: -1
      },
      end: {
        x: -1,
        y: -1
      },
      isDown: false,
      can: null,
      ctx: null,

    }
  },
  methods: {
    send(elId) {
      let photo = document.getElementById(elId).files[0];
      let formData = new FormData();

      formData.append("myFile", photo);
      this.upload(formData)
    },
    upload(formData) {
      const imageMaxWidth = () => {
        return this.imageMaxWidth
      };
      fetch('/upload', {method: "POST", body: formData})
          .then(r => r.json())
          .then(r => {
            let img = new Image()

            img.onload = function () {
              let coff = imageMaxWidth() / img.width;

              let uploadImage = document.getElementById("uploadImage")
              uploadImage.setAttribute("height", img.height * coff)
              uploadImage.setAttribute("width", imageMaxWidth())

              uploadImage.getContext('2d').drawImage(img, 0, 0, 600, img.height * coff)

              let phoneImage = document.getElementById("phoneCanvas")
              phoneImage.setAttribute("height", img.height * coff)
              phoneImage.setAttribute("width", imageMaxWidth())

            }
            img.src = "/icons/" + r['image-name'];
          });
    },
    down(event) {
      this.start.x = event.offsetX
      this.start.y = event.offsetY
      this.isDown = true
    },
    move(event) {
      if (this.isDown) {
        this.removeRect(0, 0, this.imageMaxWidth, this.imageMaxWidth)
        this.redraw(event)
      }
    },
    async up() {
      this.isDown = false
      // this.redraw(event)
      const imageMaxWidth = () => {
        return this.imageMaxWidth
      };
      let file = null;
      document.getElementById("new_can").toBlob(function (blob) {
        file = new File([blob], 'test.png', {type: 'image/png'});

        let formData = new FormData()
        formData.append("myFile", file)
        formData.append("isIcon", "1")

        fetch('/upload', {method: "POST", body: formData})
            .then(r => r.json())
            .then(r => {
              let img = new Image()
              img.onload = function () {

                let coff = imageMaxWidth() / img.width;

                let can = document.getElementById("uploadImage")
                can.setAttribute("height", img.height * coff)
                let ctx = can.getContext('2d')

                ctx.drawImage(img, 0, 0, imageMaxWidth(), img.height * coff)
              }
              document.getElementById("accountIcon").src = "/icons/" + r['image-name'];
            });
      }, 'image/png');
    },
    redraw(event) {
      let dimension = event.offsetX - this.start.x > event.offsetY - this.start.y ?
          event.offsetX - this.start.x : event.offsetY - this.start.y

      dimension = Math.abs(dimension);

      let centerX
      let centerY

      if (event.offsetX > this.start.x) {
        centerX = this.start.x + (event.offsetX - this.start.x) / 2
      } else {
        centerX = this.start.x - (this.start.x - event.offsetX) / 2
      }

      if (event.offsetY > this.start.y) {
        centerY = this.start.y + (event.offsetY - this.start.y) / 2
      } else {
        centerY = this.start.y - (this.start.y - event.offsetY) / 2
      }

      this.draw(this.start.x, this.start.y, centerX, centerY, dimension, dimension)

      let subImageStartX
      if (event.offsetX < this.start.x) {
        subImageStartX = this.start.x - dimension
      } else {
        subImageStartX = this.start.x
      }

      let subImageStartY
      if (event.offsetY < this.start.y) {
        subImageStartY = this.start.y - dimension
      } else {
        subImageStartY = this.start.y
      }


      let can = document.getElementById("uploadImage")
      const new_canvas = document.createElement('canvas');
      new_canvas.width = dimension;
      new_canvas.height = dimension;
      new_canvas.id = "new_can"
      new_canvas.getContext('2d').drawImage(
          can,
          centerX - dimension / 2,
          centerY - dimension / 2,
          dimension,
          dimension,
          0,
          0,
          dimension,
          dimension,
      )

      let img = new_canvas.toDataURL("image/png");

      if (document.getElementById("new_can")) {
        document.getElementById("new_can").remove()
      }
      let im = document.createElement("img");
      im.width = dimension
      im.height = dimension
      im.src = img
      im.id = "id1"

      document.getElementById("img").appendChild(new_canvas);
    },
    draw(x, y, cx, cy, w, h) {
      let ctx = this.ctx;

      ctx.fillStyle = 'rgba(0,0,0, 0.6)'
      ctx.fillRect(0, 0, this.imageMaxWidth, this.imageMaxWidth)

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.abs(w / 2), 0, 2 * Math.PI)
      ctx.fill();
      ctx.restore();
    },
    removeRect(x, y, w, h) {
      this.ctx.clearRect(x, y, w, h)
    }
  },
  mounted() {
    this.can = document.getElementById("phoneCanvas")
    this.ctx = this.can.getContext('2d')

    this.ctx.strokeStyle = "blue"
    this.ctx.setLineDash([8, 8])
    this.ctx.lineWidth = 3
  }
}
</script>

<style scoped>
.phoneCanvas {
  position: absolute;
  transform: translateX(-50%);
}

.uploadImage {
  position: absolute;
  transform: translateX(-50%);
}

.sub {
  position: absolute;
  display: none;
}

.image{
  min-width:1000px;
  text-align: center;
}
</style>