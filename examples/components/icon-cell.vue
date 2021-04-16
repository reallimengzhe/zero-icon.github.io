<template>
  <div class="icon-cell" @click="visible = true">
    <h1 class="icon-cell-icon">
      <zero-icon :icon="name" id="icon" />
    </h1>
    <h5 class="icon-cell-name">{{ name }}</h5>
    <a-modal
      centered
      v-model="visible"
      width="580px"
      class="icon-dialog"
      :title="name"
      :footer="null"
      :header="null"
    >
      <div class="icon-dialog-display">
        <zero-icon :icon="name" />
      </div>
      <div class="icon-dialog-details">
        <h4 class="icon-dialog-details-title">
          <span>关键词：{{ tag.join("、") }}</span>
          <!-- <zero-icon icon="add-circle-filled"></zero-icon> -->
        </h4>
        <div class="icon-dialog-details-code">
          <a-input v-model="iconCode" ref="code" />
        </div>
        <div class="icon-dialog-details-download">
          <a-button type="primary" @click="handleCopy">复制代码</a-button>
          <span style="flex: 1"></span>
          <a-button disabled>
            <zero-icon icon="download"></zero-icon>
            <span>下载 PNG</span>
          </a-button>
          <a-button type="primary" @click="handleDownloadSvg">
            <zero-icon icon="download"></zero-icon>
            <span>下载 SVG</span>
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "IconCell",
  props: { name: String, tag: Array },
  components: {},
  data() {
    return {
      visible: false,
      iconCode: "",
    };
  },
  created() {
    this.iconCode = `<zero-icon icon="${this.name}" />`;
  },
  methods: {
    // copy html element
    handleCopy() {
      this.$refs.code.$refs.input.select();
      document.execCommand("Copy");
      this.$message.success(`复制了以下内容：<zero-icon icon="${this.name}" />`);
    },
    // download svg
    handleDownloadSvg() {
      // create file
      let file = require(`../../icons/${this.name}.svg`);
      let targetFile = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" xml:space="preserve">${file.default.node.innerHTML}</svg>`;
      // download file
      let blob = new Blob([targetFile]);
      let link = document.createElement("a");
      let href = window.URL.createObjectURL(blob); // 创建下载的链接
      link.href = href;
      link.download = decodeURI(`${this.name}.svg`); // 下载后文件名
      document.body.appendChild(link);
      link.click(); //点击下载
      document.body.removeChild(link); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉 blob 对象

      // let file = require(`../../icons/${this.name}.svg`);
      // console.log(file);
      //
      // var nowA = document.createElement("a");
      // nowA.setAttribute("href", `../../icons/${this.name}.svg`);
      // nowA.setAttribute("download", `${this.name}.svg`);
      // nowA.style.display = "none";
      // document.body.appendChild(nowA);
      // nowA.click();
      // document.body.removeChild(nowA);
    },
  },
};
</script>

<style lang="less">
@import "@/styles/variables";
.icon-cell {
  height: 128px;
  box-sizing: border-box;
  border: 1px solid transparent;
  text-align: center;
  padding: 20px;
  border-radius: 4px;
  transition: @--transition-primary;
  &:hover {
    border: 1px solid black;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .icon-cell-icon {
      color: black;
    }
  }
  &-icon {
    color: gray;
    margin-bottom: 10px;
    transition: @--transition-primary;
    cursor: pointer;
  }
  &-name {
    font-family: @--font-family-code;
  }
}
.icon-dialog {
  .ant-modal-body {
    display: flex;
    padding: 20px;
  }
  &-display {
    width: 116px;
    height: 116px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid @--border-color-primary;
    margin-right: 20px;
    font-size: 72px;
    border-radius: @--border-radius-base;
  }
  &-details {
    flex: 1;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    &-code {
      display: flex;
      margin-bottom: 10px;
      .ant-input {
        flex: 1;
        font-family: @--font-family-code;
      }
    }
    &-download {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .ant-btn {
        &:not(:last-child) {
          margin-right: 10px;
        }
        .zero-icon {
          margin-right: 5px;
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .icon-dialog {
    &-display {
      width: 100%;
      margin-right: 0;
    }
    &-details {
      display: none;
    }
  }
}
</style>