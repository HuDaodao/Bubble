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
var DomElement = (function () {
    function DomElement(id) {
        this.id = id;
        this.eventMap = {};
        this.children = [];
    }
    Object.defineProperty(DomElement.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (e) {
            this._parent = e;
        },
        enumerable: true,
        configurable: true
    });
    DomElement.prototype.addChild = function (c) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.id === c.id)
                return;
        }
        c.parent = this;
        this.children.push(c);
    };
    DomElement.prototype.removeChild = function (id) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].id === id) {
                this.children.splice(i, 1);
                return;
            }
        }
    };
    DomElement.prototype.bind = function (name, handler) {
        this.eventMap[name] = handler;
    };
    DomElement.prototype.eventInvoke = function (e) {
        var handlerFunc = this.eventMap[e.name];
        if (handlerFunc) {
            handlerFunc(this.id, e.name);
            return;
        }
        if (e.stopBubble) {
            console.error("stopBubble");
        }
        else {
            this.parent.eventInvoke(e);
        }
    };
    return DomElement;
}());
var ClickedElement = (function (_super) {
    __extends(ClickedElement, _super);
    function ClickedElement(id) {
        var _this = _super.call(this, id) || this;
        _this.id = id;
        return _this;
    }
    return ClickedElement;
}(DomElement));
var Body = (function (_super) {
    __extends(Body, _super);
    function Body() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Body;
}(DomElement));
var Div = (function (_super) {
    __extends(Div, _super);
    function Div(id) {
        return _super.call(this, id) || this;
    }
    return Div;
}(DomElement));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.click = function () {
        this.eventInvoke({ name: 'click', stopBubble: false });
    };
    return Button;
}(DomElement));
var body = new Body('body');
body.addChild(new Div('div1'));
body.addChild(new Div('div2'));
body.addChild(new Div('div3'));
var div4 = new Div('div4');
div4.bind('click', function (id, event) {
    console.log(id + " invoked " + event);
});
var btn = new Button('btn1');
div4.addChild(btn);
body.addChild(div4);
btn.click();
//# sourceMappingURL=dom.js.map