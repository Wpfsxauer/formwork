Date.prototype.format = function (fmt) {
    const timeMap = {
        "(y+)": this.getFullYear(),
        "(M+)": this.getMonth() + 1,
        "(d+)": this.getDate(),
        "(h+)": this.getHours(),
        "(m+)": this.getMinutes(),
        "(s+)": this.getSeconds(),
    };

    for (let k in timeMap) {
        const reg = new RegExp(k);
        if (reg.test(fmt)) {
            const time = timeMap[k].toString().length === 1 ? "0" + timeMap[k] : timeMap[k];
            fmt = fmt.replace(reg, time);
        }
    }
    return fmt;
};

const time = new Date().format("yyyy-MM-dd hh:mm:ss").replace(/-/g, "").replace(/:/g, "").replace(/\s/g, "");



module.exports = {
    time
};
