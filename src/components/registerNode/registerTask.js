export default function registerTask (lf) {
  lf.register('task', ({ RectNode, RectNodeModel, h }) => {
    class View extends RectNode {
      getShapeStyle() {
        const attributes = super.getShapeStyle();
        const properties = super.getProperties();
        // 判断自定义属性customStatus是否为error,
        // 如果是，则将这个节点的填充颜色设置为红色。
        if (properties.customStatus === 'error') {
          attributes.fill = '#f42f00'
        } else if (properties.customStatus === "empty") {
          attributes.fill = '#898989'
        } else if (properties.customStatus === "success") {
          attributes.fill = '#00b554';
        }
        return attributes;
      }
      getShape() {
        const style = this.getShapeStyle();
        const { width, height, } = style;
        const { x, y, } = this.getAttributes();
        const position = {
          x: x - width / 2,
          y: y- height / 2,
        }
        return h("rect", {
          ...style,
          ...position,
        });
      }
    }
    class Model extends RectNodeModel {
      constructor (data, graphModel) {
        super(data, graphModel)
        this.radius = 20;
      }
    }
    return {
      view: View,
      model: Model
    }
  })
}
