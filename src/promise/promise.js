class promise {
    constructor(handler) {
        this.resolveHandler = null;
        this.rejectedHandler = null;
        setTimeout(() => {
            handler(this.resolveHandler, this.rejectedHandler);
        }, 0);
    }

    then(resolve, reject) {
        this.resolveHandler = resolve;
        this.rejectedHandler = reject;
        return this;
    }
}


function getPromise() {
    return new promise((resolve, reject) => {
        setTimeout(() => {
            resolve(20);
        }, 1000);
    });
}
getPromise().then((res) => {
    console.log(res);
}, (error) => {
    console.log(error);
});

const promise1 = getPromise();
setTimeout(() => {
    promise1.then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });
}, 0);

function getFPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(20), 1000);
    });
}

const promise2 = getFPromise();
setTimeout(() => {
    promise2.then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });
}, 0);
