
// 抽象的基类   可被继承
abstract class DomElement {
    /* 属性*/
    // 父级 类型为基类本身
    private _parent: DomElement;
    // 可读
    get parent() {
        return this._parent;
    }
    // 可写
    set parent(e: DomElement) {
        this._parent = e;
    }
    // 子集  类型为基类类型的数组
    public children: DomElement[];
    // 事件字典  [key为string类型的]：value为DomEventHandler类型的（值为一个事件处理）
    public eventMap: { [name: string]: DomEventHandler } = {};

    /*构造函数，带有一个参数id*/
    constructor(public id: string) {
         this.children = [];
    }

    /* 方法*/
    // 加入一个子集 参数：一个DomElement 
    addChild(c: DomElement) {
        for (let child of this.children) {
            if (child.id === c.id) return;
        }
        c.parent = this;
        this.children.push(c);
    }
    // 移除一个子集 参数：要移除的Id
    removeChild(id: string) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].id === id) {
                this.children.splice(i, 1);
                return;
            }
        }
    }

    // 绑定方法（用于绑定事件） name:事件名 handler：事件处理
    bind(name: string, handler: DomEventHandler) {
        this.eventMap[name] = handler;
    }
    // 行使事件方法，需一个事件作为参数
    // 字典不需要for循环  js里undefined，null，空字符串，false都为false
    protected eventInvoke(e: DomEvent) {
        // for (let name in this.eventMap) {
            // 如果当前类的事件字典中有这个事件
            let handlerFunc = this.eventMap[e.name];
            if (handlerFunc) {
                handlerFunc(this.id, e.name);
                return;
            }
        // }
        if(e.stopBubble){
            console.error("stopBubble");
        }else{
            this.parent.eventInvoke(e);
        }
    }
}


abstract class ClickedElement extends DomElement {
    constructor(public id: string) {
        super(id);
    }
}

/*接口*/
// 事件 name：事件名 stopBubble：是否冒泡
interface DomEvent {
    name: string;
    stopBubble:boolean
}
// 事件处理 有一个匿名方法 无返回值 参数id：当前实体的ID event：当前的事件名
interface DomEventHandler {
    (id: string, event: string): void;
}


// 继承抽象基类
class Body extends DomElement {

}

class Div extends DomElement {
    constructor(id: string) {
        super(id);
    }
}
// 继承抽象基类的Button 类，自己又有一个click方法，
// 这个方法使用了基类里面的行使事件方法，并传入一个事件
class Button extends DomElement {
    click() {
        this.eventInvoke({ name: 'click' ,stopBubble:false})
    }
}

let body = new Body('body');

body.addChild(new Div('div1'));
body.addChild(new Div('div2'));
body.addChild(new Div('div3'));

let div4 = new Div('div4');
div4.bind('click', (id, event): void => {
    console.log(`${id} invoked ${event}`);
});

let btn = new Button('btn1');
div4.addChild(btn);

body.addChild(div4);

btn.click();



