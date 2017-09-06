var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bubble = (function () {
    function Bubble(id) {
        this.id = id;
        this.eventMap = {};
        this.children = [];
    }
    Bubble.prototype.addChildren = function (child) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.id === child.id)
                return;
        }
        child.parent = this;
        this.children.push(child);
    };
    Bubble.prototype.bind = function (name, handler) {
        this.eventMap[name] = handler;
    };
    // 事件执行
    Bubble.prototype.eventInvoke = function (e) {
        var handler = this.eventMap[e.name];
        if (handler) {
            handler(this.id, e.name);
            // return;
        }
        if (e.stopBubble) {
            console.error("stopBubble");
        }
        else {
            // if(this.parent)
            this.parent.eventInvoke(e);
        }
    };
    return Bubble;
}());
var BubbleClass = (function (_super) {
    __extends(BubbleClass, _super);
    function BubbleClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor(id:string){
    //     // 包含构造函数的派生类必须调用super()，它会执行基类的构造方法。
    //     super(id);
    // }
    BubbleClass.prototype.bubbleBreak = function () {
        this.eventInvoke({ name: 'breake', stopBubble: false });
    };
    BubbleClass.prototype.click = function () {
        this.eventInvoke({ name: 'click', stopBubble: false });
    };
    return BubbleClass;
}(Bubble));
var bubble1 = new BubbleClass("bubble1");
var bubble2 = new BubbleClass("bubble2");
var bubble3 = new BubbleClass("bubble3");
bubble1.addChildren(bubble2);
bubble2.bind('breake', function (id, event) {
    console.log(id + " invoked " + event);
});
bubble2.bind('click', function (id, event) {
    console.log(id + " invoked " + event);
});
bubble2.addChildren(bubble3);
bubble3.bind('click', function (id, event) {
    console.log(id + " invoked " + event);
});
bubble3.bubbleBreak();
bubble3.click();
// 空字符串为false
function test(firstName, lastname) {
    if (lastname) {
        console.log(firstName + "&" + lastname);
    }
    else {
        console.log(firstName);
    }
}
var ab = test("Tom", "");
var as = test("Tom", "Tina");
// 枚举
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.up); //0
console.log(Direction[Direction.up]); //up
