<template>
  <div class="index">
    <div class="left">
      <el-menu
          default-active="1-4-1"
          class="menu"
          collapse-transition
          :collapse="isCollapse"
          background-color="rgb(38, 52, 69)"
          text-color="#fff"
          active-text-color="#28a745">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="header">
        <div class="hamburger">
          <i class="iconfont icon-hamburger"></i>
        </div>
      </div>
      <div class="tags">
      </div>
      <div class="main">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    padding: 0px;
    margin: 0px;
    .left {
      .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        background-color: rgb(38, 52, 69);
      }
    }
    .right {
      margin: 0px;
      .header {
        margin: 0px;
        .hamburger {
          float: left;
          height: 50px;
          line-height: 58px;
          padding: 0 10px;
          width: 20px;
          height: 20px;
        }
      }
      .tags {
        margin: 0px;
      }
      .main {
        margin: 0px;
      }
    }
  }
</style>
