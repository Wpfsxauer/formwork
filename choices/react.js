const fs = require("fs");

function template(className) {
	return `
import * as React from 'react';

export class ${className} extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount(){

    }

    render() {
        return (
            <div></div>
        )
    }
}
    `;
}

module.exports = function (filename) {
	fs.writeFile(`./${filename}.jsx`, template(filename), function (err) {
		if (err) {
			console.log("创建失败：", err);
		} else {
			console.log(`创建文件成功！${filename}.jsx`);
		}
	});
};
