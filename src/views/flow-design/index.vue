<template>
  <div class="fd-flow-design">
    <div class="head">
      <div class="head-center"></div>
      <div class="head-right">
        <el-button size="mini" icon="el-icon-finished" @click="save"
          >保存</el-button
        >
      </div>
    </div>
    <div class="container">
      <div class="sidebar">
        <FlowNodes />
      </div>
      <div class="main">
        <div id="topology-canvas" class="full"></div>
      </div>
      <div class="panel">
        <FlowProps :props.sync="props" @change="onUpdateProps" />
      </div>
    </div>
  </div>
</template>
<script>
import { Topology } from 'topology-core'
import { registerNode } from 'topology-core/middles'
import { Tools, TooltipTexts, getStartAndEndNodes } from '@/helper/flow'
import { base, baseIconRect, baseTextRect } from './nodes/index'
import FlowNodes from './comp/FlowNodes'
import FlowProps from './comp/FlowProps'

export default {
  name: 'FdFlowDesign',
  components: {
    FlowNodes,
    FlowProps
  },
  data() {
    return {
      tools: Tools,
      tooltipTexts: TooltipTexts,
      canvas: {},
      canvasOptions: {},
      props: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      },
      data: {
        lineName: 'polyline',
        nodes: getStartAndEndNodes(),
        lines: []
      }
    }
  },
  created() {
    this.canvasRegister()
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
    this.open()
    setTimeout(() => {
      this.canvas.render()
    }, 0)
    window.addEventListener('resize', () => {
      this.canvas.resize()
    })
  },
  methods: {
    canvasRegister() {
      registerNode('baseNode', base, null, baseIconRect, baseTextRect)
    },
    save() {
      console.log(JSON.stringify(this.canvas.data.pens))
    },
    async open() {
      this.canvas.open(this.data)
    },
    onMessage(event, data) {
      switch (event) {
        case 'node':
        case 'addNode':
          this.props = {
            node: data,
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          break
        case 'line':
        case 'addLine':
          this.props = {
            node: null,
            line: data,
            multi: false,
            nodes: null,
            locked: data.locked
          }
          break
        case 'multi':
          this.props = {
            node: null,
            line: null,
            multi: true,
            nodes: data.length > 1 ? data.nodes : null,
            locked: this.getLocked(data)
          }
          break
        case 'space':
          this.props = {
            node: null,
            line: null,
            multi: false,
            nodes: null,
            locked: false
          }
          break
        case 'moveOut':
          break
        case 'moveNodes':
        case 'resizeNodes':
          if (data.length > 1) {
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data,
              locked: this.getLocked({ nodes: data })
            }
          } else {
            this.props = {
              node: data[0],
              line: null,
              multi: false,
              nodes: null,
              locked: false
            }
          }
          break
        case 'resize':
        case 'scale':
        case 'locked':
          // if (this.canvas && this.canvas.data) {
          //   this.$store.commit('canvas/data', {
          //     scale: this.canvas.data.scale || 1,
          //     lineName: this.canvas.data.lineName,
          //     fromArrowType: this.canvas.data.fromArrowType,
          //     toArrowType: this.canvas.data.toArrowType,
          //     fromArrowlockedType: this.canvas.data.locked
          //   })
          // }
          break
      }
    },
    getLocked(data) {
      let locked = true
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }

      return locked
    },
    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node)
    }
  }
}
</script>
<style lang="scss" scoped>
.fd-flow-design {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  .head {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #fff;
    z-index: 4;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    &-left {
      i {
        margin-right: 8px;
        cursor: pointer;
      }
    }
    &-right {
      min-width: 240px;
      text-align: right;
    }
    ::v-deep {
      .el-radio-button__inner {
        border-radius: 0;
      }
      .is-active {
        /* .el-radio-button__inner {
          color: #fff;
          background-color: $--color-primary;
        } */
      }
    }
  }
  .container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 54px;
    background-color: #fff;
    .sidebar {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      width: 150px;
      border-right: 1px solid #e3e3e3;
      padding: 15px 0;
      overflow-y: auto;
    }
    .main {
      position: absolute;
      top: 0;
      left: 150px;
      right: 280px;
      bottom: 0;
      background-color: #f5f5f5;
    }
    .panel {
      position: absolute;
      width: 280px;
      bottom: 0;
      right: 0;
      top: 0;
      border-left: 1px solid #e3e3e3;
      overflow: auto;
    }
  }
}
.full {
  height: 100%;
  background-color: #fff;
}
</style>
