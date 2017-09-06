abstract class Bubble {
    parent: Bubble;
    children: Bubble[];
    eventMap: { [name: string]: MyEventHandler } = {};

    constructor(public id: string) {
        this.children = [];
    }

    addChildren(child: Bubble) {
        for (let i of this.children) {
            if (i.id === child.id) return;
        }
        child.parent = this;
        this.children.push(child);
    }

    bind(name: string, handler: MyEventHandler) {
        this.eventMap[name] = handler;
    }

    // 事件执行
    eventInvoke(e: MyEvent) {
        let handler = this.eventMap[e.name];
        if (handler) {
            handler(this.id, e.name);
            // return;
        }
        if (e.stopBubble) {
            console.error("stopBubble");
        } else {
            if(this.parent) this.parent.eventInvoke(e);
        }
    }
}

// 接口
interface MyEvent {
    name: string;
    stopBubble: boolean
}
interface MyEventHandler {
    (id: string, event: string): void;
}

class BubbleClass extends Bubble {
    // constructor(id:string){
    //     // 包含构造函数的派生类必须调用super()，它会执行基类的构造方法。
    //     super(id);
    // }
    bubbleBreak() {
        this.eventInvoke({ name: 'breake', stopBubble: false })
    }
    click() {
        this.eventInvoke({ name: 'click', stopBubble: false })
    }
}

let bubble1 = new BubbleClass("bubble1");
let bubble2 = new BubbleClass("bubble2");
let bubble3 = new BubbleClass("bubble3");
bubble1.addChildren(bubble2);

bubble2.bind('breake', (id, event): void => {
    console.log(`${id} invoked ${event}`);
});
bubble2.bind('click', (id, event): void => {
    console.log(`${id} invoked ${event}`);
});
bubble2.addChildren(bubble3);

bubble3.bind('click', (id, event): void => {
    console.log(`${id} invoked ${event}`);
});

bubble3.bubbleBreak();
bubble3.click();


// 空字符串为false
function test(firstName:string,lastname?:string){
    if(lastname){
        console.log(firstName+"&"+lastname)
    }
    else{
        console.log(firstName);
    }
}

let ab=test("Tom","");
let as=test("Tom","Tina");


// 枚举
enum Direction{
    up,
    Down,
    Left,
    Right
}
console.log(Direction.up);//0
console.log(Direction[Direction.up]);//up
