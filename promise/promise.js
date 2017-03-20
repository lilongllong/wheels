class proms
{
    constructor(handler)
    {
        this.resolveHandler = null;
        this.rejectedHandler = null;
        console.log("*****************现在创建");
        setTimeout(() => {
            handler(this.resolveHandler, this.rejectedHandler);
        }, 0);
    }

    then(resolve, reject)
    {
        this.resolveHandler = resolve;
        this.rejectedHandler = reject;
        return this;
    }
}


function getPromise()
{
    return new proms((resolve, reject) => {
        //自行判断执行哪一个
        resolve("20");
        reject("30");
    });
}
console.log("******************** 创建结束");
getPromise().then((result) => {
    console.log(result);
}, (reason) => {
    console.log(reason);
});



(function(exports){
    var Promise = function(excutor)
    {
        if (typeof(excutor) !== "function")
        {
            threw new Error("Resolver promise " + excutor + "is not a function");
        }

        this.state = Promise.pending;
        this._resolvers = [];
        this._rejectors = [];

        function _resolve(result)
        {
            if (this.state !== Promise.pending)
            {
                throw new Error("The promise state can not changed from " + this.state);
            }
            this.state = Promise.fullfilled;
            setTimeout((function(){
                while(this._resolvers.length > 0)
                {
                    var res = this._resolvers.shift()(result);//????
                    if (res !== undefinded)
                    {
                        result = res; //????
                    }
                }
            }).bind(this), 0);

        }


        function  _reject(reason)
        {
            if (this.state !== Promise.pending)
            {
                throw new Error("The promise state can not be chnaged from " + this.state);
            }
            this.state = Promise.rejected;
            setTimeout((function() {
                if (this._rejectors.length > 0)
                {
                    while (this._rejectors.length > 0)
                    {
                        this._rejectors.shift()(reason);
                    }
                }
                else
                {
                    console.error("Uncaught Error in Promise: " + reason);
                }
            }), 0);
        }
        excutor(_resolve.bind(this), _reject.bind(this));
    }

    Promise.prototype.then = function(onFullfil, onFail)
    {
        if (typeof(onFullfil) === "function")
        {
            this._resolve(onFullfil);
        }

        if (typeof(onFail) === "function")
        {
            this._reject(onFail);
        }

        return this;
    }

    Promise.prototype.catch = function(onReject)
    {
        return this._reject(null, onReject);
    }

    Promise.pending = "pending";
    Promise.resolve = "resolve";
    Promise.reject = "reject";

    exports.Promise = Promise;
})(polyfill);
